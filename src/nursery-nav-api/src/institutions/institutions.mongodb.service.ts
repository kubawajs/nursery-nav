import { InjectModel } from "@nestjs/mongoose";
import { InstitutionType } from "../shared/models/institutionType";
import PaginatedResult from "../shared/models/paginatedresult";
import { InstitutionAutocompleteDto } from "./DTO/institutionAutocompleteDto";
import { InstitutionDto } from "./DTO/institutionDto";
import { InstitutionListItemDto } from "./DTO/institutionListItemDto";
import { IInstitutionsService } from "./iinstitutions.service";
import { SortParams } from "./params/sortParams";
import { Inject, Injectable } from "@nestjs/common";
import { Institution } from "../shared/schemas/institution.schema";
import { Model } from "mongoose";
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class InstitutionsMongoDbService implements IInstitutionsService {
    constructor(
        @InjectModel(Institution.name) private institutionModel: Model<Institution>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async findAll(page: number, size: number, sort: SortParams, city?: string, voivodeship?: string, institutionType?: InstitutionType[], priceMin?: number, priceMax?: number): Promise<PaginatedResult<InstitutionListItemDto>> {
        const institutions = this.institutionModel.find().exec();
        return Promise.resolve(institutions as unknown as PaginatedResult<InstitutionListItemDto>);
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

    async getInstitutionsAutocomplete(searchQuery: string): Promise<InstitutionAutocompleteDto[]> {
        const CACHE_KEY = 'InstitutionsService_getInstitutionsAutocomplete';
        const cacheKey = `${CACHE_KEY}_${searchQuery}`;
        const cacheData = await this.cacheManager.get(cacheKey) as InstitutionAutocompleteDto[];
        if (cacheData) {
            return Promise.resolve(cacheData);
        }

        const institutions = await this.institutionModel.find({ name: { '$regex': searchQuery, '$options': 'i' } }).exec();
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
}