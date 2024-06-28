import { Inject, Injectable } from '@nestjs/common';
import { InstitutionType } from '../shared/models/institutionType';
import PaginatedResult from '../shared/models/paginatedresult';
import { SortParams } from './params/sortParams';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InstitutionAutocompleteDto } from './DTO/institutionAutocompleteDto';
import { InstitutionDto } from './DTO/institutionDto';
import { InstitutionListItemDto } from './DTO/institutionListItemDto';
import { IInstitutionsService } from './iinstitutions.service';

@Injectable()
export class InstitutionsDocumentService implements IInstitutionsService {
    private institutions: InstitutionDto[];

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
        this.loadData();
    }

    async findAll(page: number, size: number, sort: SortParams, city?: string, voivodeship?: string, institutionType?: InstitutionType[], priceMin?: number, priceMax?: number)
        : Promise<PaginatedResult<InstitutionListItemDto>> {
        const CACHE_KEY = 'InstitutionsService_findAll';
        size = this.setPageSize(size);

        const paginatedResult: PaginatedResult<InstitutionListItemDto> = {
            items: [],
            totalItems: 0,
            pageIndex: 1,
            pageSize: size,
            ids: [],
            totalPages: 1,
        };

        // If cache exists, return it
        const cacheKey = `${CACHE_KEY}_${page || 1}_${size}_${sort}_${city}_${voivodeship}_${institutionType}_${priceMin}_${priceMax}`;
        const result = await this.cacheManager.get(cacheKey) as PaginatedResult<InstitutionListItemDto>;
        if (result) {
            return Promise.resolve(result);
        }

        // If cache doesn't exist, filter and sort data
        if (this.institutions) {
            let institutionsArray = Array.from(this.institutions);
            if (city) {
                institutionsArray = institutionsArray.filter((institution) => institution.address.city && institution.address.city.toLowerCase().indexOf(city.toLowerCase()) !== -1);
            }
            if (voivodeship) {
                institutionsArray = institutionsArray.filter((institution) => institution.address.voivodeship && institution.address.voivodeship.toLowerCase().indexOf(voivodeship.toLowerCase()) !== -1);
            }
            if (institutionType && institutionType.length > 0) {
                institutionsArray = institutionsArray.filter((institution) => institutionType.includes(institution.institutionType));
            }
            if (priceMin) {
                institutionsArray = institutionsArray.filter((institution) => institution.basicPricePerMonth >= priceMin);
            }
            if (priceMax) {
                institutionsArray = institutionsArray.filter((institution) => institution.basicPricePerMonth <= priceMax);
            }
            paginatedResult.totalPages = this.institutions?.length ? Math.ceil(institutionsArray.length / size) : 0;
            paginatedResult.pageIndex = this.setPage(page, paginatedResult.totalPages);
            paginatedResult.totalItems = institutionsArray.length;
            paginatedResult.ids = institutionsArray?.map((institution) => institution.id) ?? [];

            const sortedInstutions = institutionsArray.sort((a, b) => this.sortMethod(sort, a, b));
            const pageData = sortedInstutions.slice((paginatedResult.pageIndex - 1) * size, paginatedResult.pageIndex * size);
            const institutionList = pageData.map((institution) => {
                const institutionListItem: InstitutionListItemDto = this.mapToInstutionListItem(institution);
                return institutionListItem;
            });
            paginatedResult.items = institutionList;

            // Save to cache
            const cacheKey = `${CACHE_KEY}_${paginatedResult.pageIndex}_${size}_${sort}_${city}_${voivodeship}_${institutionType}_${priceMin}_${priceMax}`;
            await this.cacheManager.set(cacheKey, paginatedResult);
            return Promise.resolve(paginatedResult);
        }

        return Promise.resolve(paginatedResult);
    }

    async getById(id: number): Promise<InstitutionDto> {
        const CACHE_KEY = 'InstitutionsService_getById';
        const cacheKey = `${CACHE_KEY}_${id}`;
        const cacheData = await this.cacheManager.get(cacheKey) as InstitutionDto;
        if (cacheData) {
            return Promise.resolve(cacheData);
        }

        const institution = this.institutions.find((institution) => institution.id === id);
        if (institution) {
            await this.cacheManager.set(cacheKey, institution);
            return Promise.resolve(institution);
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

        const institutions = this.institutions.filter((institution) => ids.includes(institution.id));
        if (institutions.length === 0) {
            return Promise.reject('Institutions not found');
        }

        await this.cacheManager.set(cacheKey, institutions);
        return Promise.resolve(institutions);
    }

    async getInstitutionsAutocomplete(searchQuery: string): Promise<InstitutionAutocompleteDto[]> {
        const CACHE_KEY = 'InstitutionsService_getInstitutionsAutocomplete';
        const cacheKey = `${CACHE_KEY}_${searchQuery}`;
        const cacheData = await this.cacheManager.get(cacheKey) as InstitutionAutocompleteDto[];
        if (cacheData) {
            return Promise.resolve(cacheData);
        }

        const institutions = this.institutions.filter((institution) => institution.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
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

    private async loadData() {
        try {
            const data = require('../../data/06062024-RZ-instytucje-enriched.json');
            this.institutions = data as InstitutionDto[];
        } catch (error) {
            console.error('Error loading data:', error);
        }
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

    private sortMethod(sort: SortParams, a: InstitutionDto, b: InstitutionDto) {
        switch (sort) {
            case SortParams.PRICE_ASC:
                return a.basicPricePerMonth - b.basicPricePerMonth || a.basicPricePerHour - b.basicPricePerHour;
            case SortParams.PRICE_DESC:
                return b.basicPricePerMonth - a.basicPricePerMonth || b.basicPricePerHour - a.basicPricePerHour;
            case SortParams.NAME_ASC:
                return a.name.localeCompare(b.name);
            case SortParams.NAME_DESC:
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    }
}