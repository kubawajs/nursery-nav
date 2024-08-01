import { InjectModel } from "@nestjs/mongoose";
import { InstitutionType } from "../shared/models/institutionType";
import PaginatedResult from "../shared/models/paginatedresult";
import { InstitutionAutocompleteDto } from "./DTO/institutionAutocompleteDto";
import { InstitutionDto } from "./DTO/institutionDto";
import { InstitutionListItemDto } from "./DTO/institutionListItemDto";
import { SortParams } from "./params/sortParams";
import { Inject, Injectable } from "@nestjs/common";
import { Institution } from "../shared/schemas/institution.schema";
import { Document, Model, Query, Types } from "mongoose";
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from "@nestjs/cache-manager";

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
    constructor(
        @InjectModel(Institution.name) private institutionModel: Model<Institution>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async findAll(params: findAllParams): Promise<PaginatedResult<InstitutionListItemDto>> {
        const CACHE_KEY = 'InstitutionsService_findAll';
        let size = this.setPageSize(params.size);

        const paginatedResult: PaginatedResult<InstitutionListItemDto> = {
            items: [],
            totalItems: 0,
            pageIndex: 1,
            pageSize: size,
            ids: [],
            totalPages: 1,
        };

        // If cache exists, return it
        let cacheKey = `${CACHE_KEY}_${params.page || 1}_${size}_${params.sort}_${params.city}_${params.voivodeship}_${params.insType}_${params.priceMin}_${params.priceMax}`;
        const result = await this.cacheManager.get(cacheKey) as PaginatedResult<InstitutionListItemDto>;
        if (result) {
            return Promise.resolve(result);
        }

        // If cache doesn't exist, filter and sort data
        let institutionsQuery = this.buildFilteredQuery(params);
        institutionsQuery = this.addQuerySorting(params.sort, institutionsQuery);

        let page = params.page === undefined || isNaN(params.page) || params.page < 1 ? 1 : params.page;
        institutionsQuery = institutionsQuery
            .skip((page - 1) * size)
            .limit(size)
            .select('id institutionType name website email phone basicPricePerMonth basicPricePerHour isAdaptedToDisabledChildren address');
        const institutionsArray = (await institutionsQuery.exec()) as InstitutionDto[];

        if (institutionsArray.length === 0) {
            return Promise.resolve(paginatedResult);
        }

        let institutionIdsQuery = this.buildFilteredQuery(params).select('id');
        const institutionIds = await institutionIdsQuery.select('id').exec();
        paginatedResult.ids = institutionIds.map((id) => id.id);
        paginatedResult.totalPages = Math.ceil(institutionIds.length / size) ?? 0;
        paginatedResult.pageIndex = this.setPage(page, paginatedResult.totalPages);
        paginatedResult.totalItems = institutionIds.length;

        const institutionList = institutionsArray.map((institution) => {
            const institutionListItem: InstitutionListItemDto = this.mapToInstutionListItem(institution);
            return institutionListItem;
        });
        paginatedResult.items = institutionList;

        // Save to cache
        cacheKey = `${CACHE_KEY}_${paginatedResult.pageIndex}_${size}_${params.sort}_${params.city}_${params.voivodeship}_${params.insType}_${params.priceMin}_${params.priceMax}`;
        await this.cacheManager.set(cacheKey, paginatedResult);
        return Promise.resolve(paginatedResult);
    }

    async getById(id: number): Promise<InstitutionDto> {
        const CACHE_KEY = 'InstitutionsService_getById';
        const cacheKey = `${CACHE_KEY}_${id}`;
        const cacheData = await this.cacheManager.get(cacheKey) as InstitutionDto;
        if (cacheData) {
            return Promise.resolve(cacheData);
        }

        const institution = this.institutionModel.findOne({ id: id }).exec();
        if (institution) {
            await this.cacheManager.set(cacheKey, institution);
            return institution as unknown as InstitutionDto;
        }

        return Promise.reject(`Institution with id ${id} not found`);
    }

    async getByIds(ids: number[]): Promise<InstitutionDto[]> {
        const CACHE_KEY = 'InstitutionsService_getByIds';
        const cacheKey = `${CACHE_KEY}_${ids.join('_')}`;
        const cacheData = await this.cacheManager.get(cacheKey) as InstitutionDto[];
        if (cacheData) {
            return Promise.resolve(cacheData);
        }

        const institutions = await this.institutionModel.find({ id: { $in: ids } }).exec();
        if (institutions.length === 0) {
            return Promise.reject('Institutions not found');
        }

        await this.cacheManager.set(cacheKey, institutions);
        return institutions as unknown as InstitutionDto[];
    }

    async getInstitutionsAutocomplete(searchQuery: string, size?: number): Promise<InstitutionAutocompleteDto[]> {
        size = this.setPageSize(size);
        const CACHE_KEY = `$InstitutionsService_getInstitutionsAutocomplete_${size}`;
        const cacheKey = `${CACHE_KEY}_${searchQuery}`;
        const cacheData = await this.cacheManager.get(cacheKey) as InstitutionAutocompleteDto[];
        if (cacheData) {
            return Promise.resolve(cacheData);
        }

        const institutions = await this.institutionModel.find({ name: { '$regex': searchQuery, '$options': 'i' } }).limit(size).exec();
        const institutionList = institutions.map((institution) => {
            const institutionAutocompleteDto: InstitutionAutocompleteDto = {
                name: institution.name,
                id: institution.id,
            };
            return institutionAutocompleteDto;
        });

        await this.cacheManager.set(cacheKey, institutionList);
        return Promise.resolve(institutionList);
    }

    private setPage(page: number, totalPages: number): number {
        if (page === undefined || isNaN(page)) {
            return 1;
        }
        page = page < 1 ? 1 : page;
        page = page > totalPages ? totalPages : page;
        return page;
    }

    private setPageSize(size: number): number {
        if (size === undefined || isNaN(size)) {
            return 10;
        }
        size = size < 1 ? 10 : size;
        size = size > 100 ? 100 : size;
        return size;
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
        if (params.insType && params.insType.length > 0) {
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
                institutionsQuery = institutionsQuery.sort({ basicPricePerMonth: 1, basicPricePerHour: 1 });
                break;
            case SortParams.PRICE_DESC:
                institutionsQuery = institutionsQuery.sort({ basicPricePerMonth: -1, basicPricePerHour: -1 });
                break;
            case SortParams.NAME_ASC:
                institutionsQuery = institutionsQuery.sort({ name: 1 });
                break;
            case SortParams.NAME_DESC:
                institutionsQuery = institutionsQuery.sort({ name: -1 });
                break;
            default:
                institutionsQuery = institutionsQuery.sort({ name: 1 });
                break;
        }
        return institutionsQuery;
    }
}