import { InjectModel } from "@nestjs/mongoose";
import { InstitutionType } from "../shared/models/institutionType";
import PaginatedResult from "../shared/models/paginatedresult";
import { InstitutionAutocompleteDto } from "./DTO/institutionAutocompleteDto";
import { InstitutionDto } from "./DTO/institutionDto";
import { InstitutionListItemDto } from "./DTO/institutionListItemDto";
import { SortParams } from "./params/sortParams";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Institution } from "../shared/schemas/institution.schema";
import { Document, Model, Query, Types } from "mongoose";
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { ConfigService } from '@nestjs/config';
import { AppService } from "../app.service";

export interface findAllParams {
    page: number;
    size: number;
    sort: SortParams;
    city?: string;
    voivodeship?: string;
    insType?: InstitutionType[];
    priceMin?: number;
    priceMax?: number;
}

@Injectable()
export class InstitutionsMongoDbService {
    private readonly cacheTTL: number;
    private readonly logger = new Logger(InstitutionsMongoDbService.name);

    constructor(
        @InjectModel(Institution.name) private institutionModel: Model<Institution>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private configService: ConfigService
    ) {
        this.cacheTTL = this.configService.get<number>('CACHE_TTL') || 3600; // Default 1 hour if not set
        this.verifyRedisConnection();
    }

    async findAll(params: findAllParams): Promise<PaginatedResult<InstitutionListItemDto>> {
        this.logger.debug("findAll called");
        const CACHE_KEY = 'institutions:list';
        const size = this.setPageSize(params.size);

        const paginatedResult: PaginatedResult<InstitutionListItemDto> = {
            items: [],
            totalItems: 0,
            pageIndex: 1,
            pageSize: size,
            ids: [],
            totalPages: 1,
        };

        // Generate cache key with all parameters
        const cacheKey = `${CACHE_KEY}:${JSON.stringify(params)}`;
        const cachedResult = await this.cacheManager.get<PaginatedResult<InstitutionListItemDto>>(cacheKey);

        if (cachedResult) {
            this.logger.debug("returning cached result");
            return cachedResult;
        }

        // If cache doesn't exist, filter and sort data
        let institutionsQuery = this.buildFilteredQuery(params);
        institutionsQuery = this.addQuerySorting(params.sort, institutionsQuery);

        let page = this.setPage(params.page, 1); // Default to 1 total page initially
        institutionsQuery = institutionsQuery
            .skip((page - 1) * size)
            .limit(size)
            .select('id institutionType name website email phone basicPricePerMonth basicPricePerHour isAdaptedToDisabledChildren address rating capacity kidsEnrolled');

        const [institutionsArray, totalCount] = await Promise.all([
            institutionsQuery.exec(),
            this.buildFilteredQuery(params).countDocuments()
        ]);

        if (institutionsArray.length === 0) {
            return paginatedResult;
        }

        const totalPages = Math.ceil(totalCount / size);
        paginatedResult.totalPages = totalPages;
        paginatedResult.pageIndex = this.setPage(page, totalPages);
        paginatedResult.totalItems = totalCount;

        let institutionIdsQuery = this.buildFilteredQuery(params).select('id');
        const institutionIds = await institutionIdsQuery.select('id').exec();
        paginatedResult.ids = institutionIds.map((id) => id.id); paginatedResult.items = institutionsArray.map(inst => this.mapToInstutionListItem(inst.toObject() as InstitutionDto));

        // Save to cache with TTL
        this.logger.debug("saving to cache with cache key", cacheKey);
        await this.cacheManager.set(cacheKey, paginatedResult, this.cacheTTL);

        return paginatedResult;
    }

    async getById(id: number): Promise<InstitutionDto> {
        const CACHE_KEY = `institution:${id}`;

        const cachedInstitution = await this.cacheManager.get<InstitutionDto>(CACHE_KEY);
        if (cachedInstitution) {
            return cachedInstitution;
        }

        const institution = await this.institutionModel.findOne({ id }).exec();
        if (!institution) {
            throw new Error(`Institution with id ${id} not found`);
        }

        await this.cacheManager.set(CACHE_KEY, institution, this.cacheTTL);
        return institution as unknown as InstitutionDto;
    }

    async getByIds(ids: number[]): Promise<InstitutionDto[]> {
        const CACHE_KEY = `institutions:multiple`;
        const cacheKey = `${CACHE_KEY}:${ids.sort().join(',')}`;

        const cachedInstitutions = await this.cacheManager.get<InstitutionDto[]>(cacheKey);
        if (cachedInstitutions) {
            return cachedInstitutions;
        }

        const institutions = await this.institutionModel.find({ id: { $in: ids } }).exec();
        if (institutions.length === 0) {
            throw new Error('Institutions not found');
        }

        await this.cacheManager.set(cacheKey, institutions, this.cacheTTL);
        return institutions as unknown as InstitutionDto[];
    }

    async getInstitutionsAutocomplete(searchQuery: string, size?: number): Promise<InstitutionAutocompleteDto[]> {
        const CACHE_KEY = 'institutions:autocomplete';
        const adjustedSize = this.setPageSize(size);
        const cacheKey = `${CACHE_KEY}:${searchQuery}:${adjustedSize}`;

        const cachedResults = await this.cacheManager.get<InstitutionAutocompleteDto[]>(cacheKey);
        if (cachedResults) {
            return cachedResults;
        }

        const institutions = await this.institutionModel
            .find({ name: { '$regex': searchQuery, '$options': 'i' } })
            .limit(adjustedSize)
            .select('id name')
            .exec();

        const institutionList = institutions.map(institution => ({
            name: institution.name,
            id: institution.id,
        }));

        await this.cacheManager.set(cacheKey, institutionList, this.cacheTTL);
        return institutionList;
    }

    private setPage(page: number, totalPages: number): number {
        if (page === undefined || isNaN(page)) {
            return 1;
        }
        return Math.max(1, Math.min(page, totalPages));
    }

    private setPageSize(size: number): number {
        if (size === undefined || isNaN(size)) {
            return 10;
        }
        return Math.max(1, Math.min(size, 100));
    }

    private mapToInstutionListItem(institution: InstitutionDto): InstitutionListItemDto {
        return {
            id: institution.id,
            institutionType: institution.institutionType as InstitutionType,
            name: institution.name,
            website: institution.website,
            email: institution.email,
            phone: institution.phone,
            basicPricePerMonth: institution.basicPricePerMonth,
            basicPricePerHour: institution.basicPricePerHour,
            isAdaptedToDisabledChildren: institution.isAdaptedToDisabledChildren,
            isAvailable: institution.capacity > institution.kidsEnrolled,
            city: institution.address?.city,
            rating: institution.rating,
        };
    }

    private buildFilteredQuery(params: findAllParams) {
        let institutionsQuery = this.institutionModel.find();

        if (params.city) {
            institutionsQuery = institutionsQuery.find({ 'address.city': { $regex: params.city, $options: 'i' } });
        }
        if (params.voivodeship) {
            institutionsQuery = institutionsQuery.find({ 'address.voivodeship': { $regex: params.voivodeship, $options: 'i' } });
        }
        if (params.insType?.length > 0) {
            institutionsQuery = institutionsQuery.find({ institutionType: { $in: params.insType } });
        }
        if (params.priceMin) {
            institutionsQuery = institutionsQuery.find({ basicPricePerMonth: { $gte: params.priceMin } });
        }
        if (params.priceMax) {
            institutionsQuery = institutionsQuery.find({ basicPricePerMonth: { $lte: params.priceMax } });
        }

        return institutionsQuery;
    }

    private addQuerySorting(sort: SortParams, institutionsQuery: Query<(Document<unknown, {}, Institution> & Institution & { _id: Types.ObjectId; })[], Document<unknown, {}, Institution> & Institution & { _id: Types.ObjectId; }, {}, Institution, "find", {}>) {
        switch (sort) {
            case SortParams.PRICE_ASC:
                return institutionsQuery.sort({ basicPricePerMonth: 1, basicPricePerHour: 1 });
            case SortParams.PRICE_DESC:
                return institutionsQuery.sort({ basicPricePerMonth: -1, basicPricePerHour: -1 });
            case SortParams.NAME_DESC:
                return institutionsQuery.sort({ name: -1 });
            case SortParams.NAME_ASC:
            default:
                return institutionsQuery.sort({ name: 1 });
        }
    }

    private async verifyRedisConnection() {
        try {
            await this.cacheManager.set('test', 'test', 10);
            const testResult = await this.cacheManager.get('test');
            this.logger.log('Redis connection test:', testResult === 'test' ? 'successful' : 'failed');
        } catch (error) {
            this.logger.error('Redis connection failed:', error);
        }
    }
}