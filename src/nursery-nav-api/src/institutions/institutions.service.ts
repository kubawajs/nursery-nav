import { Injectable } from '@nestjs/common';
import { InstitutionDto } from './DTO/institutionDto';
import { InstitutionListItemDto } from './DTO/institutionListItemDto';
import { InstitutionType } from '../shared/models/institutionType';
import PaginatedResult from '../shared/models/paginatedresult';
import { SortParams } from './params/sortParams';
import { InstitutionAutocompleteDto } from './DTO/institutionAutocompleteDto';

@Injectable()
export class InstitutionsService {
    private institutions: InstitutionDto[];

    constructor() {
        this.loadData();
    }

    async findAll(page: number, size: number, sort: SortParams, city?: string, voivodeship?: string, institutionType?: InstitutionType[], priceMin?: number, priceMax?: number)
        : Promise<PaginatedResult<InstitutionListItemDto>> {
        size = this.setPageSize(size);
        const totalPages = this.institutions?.length ? Math.ceil(this.institutions.length / size) : 0;
        page = this.setPage(page, totalPages);

        const paginatedResult: PaginatedResult<InstitutionListItemDto> = {
            items: [],
            totalItems: this.institutions?.length ?? 0,
            pageIndex: page,
            pageSize: size,
            ids: [],
            totalPages: totalPages,
        };
        if (this.institutions) {
            let institutionsArray = Array.from(this.institutions);
            if (city) {
                institutionsArray = institutionsArray.filter((institution) => institution.address.city.toLowerCase().indexOf(city.toLowerCase()) !== -1);
            }
            if (voivodeship) {
                institutionsArray = institutionsArray.filter((institution) => institution.address.voivodeship.toLowerCase().indexOf(voivodeship.toLowerCase()) !== -1);
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
            paginatedResult.ids = institutionsArray?.map((institution) => institution.id) ?? [];
            const sortedInstutions = institutionsArray.sort((a, b) => this.sortMethod(sort, a, b));
            const pageData = sortedInstutions.slice((page - 1) * size, page * size);
            const institutionList = pageData.map((institution) => {
                const institutionListItem: InstitutionListItemDto = this.mapToInstutionListItem(institution);
                return institutionListItem;
            });
            paginatedResult.items = institutionList;
            return Promise.resolve(paginatedResult);
        }

        return Promise.resolve(paginatedResult);
    }

    async getById(id: number): Promise<InstitutionDto> {
        const institution = this.institutions.find((institution) => institution.id === id);
        if (institution) {
            return Promise.resolve(institution);
        }

        return Promise.reject(`Institution with id ${id} not found`);
    }

    async getInstitutionsAutocomplete(searchQuery: string): Promise<InstitutionAutocompleteDto[]> {
        const institutions = this.institutions.filter((institution) => institution.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
        const institutionList = institutions.map((institution) => {
            const institutionAutocompleteDto: InstitutionAutocompleteDto = {
                name: institution.name,
                id: institution.id,
            };
            return institutionAutocompleteDto;
        });

        return Promise.resolve(institutionList);
    }

    private async loadData() {
        try {
            const data = require('../../data/052024-RZ-instytucje-enriched.json');
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
            isAdaptedToDisabledChildren: institution.isAdaptedToDisabledChildren,
            city: institution.address?.city,
        };
    }

    private sortMethod(sort: SortParams, a: InstitutionDto, b: InstitutionDto) {
        switch (sort) {
            case SortParams.PRICE_ASC:
                return a.basicPricePerMonth - b.basicPricePerMonth;
            case SortParams.PRICE_DESC:
                return b.basicPricePerMonth - a.basicPricePerMonth;
            case SortParams.NAME_ASC:
                return a.name.localeCompare(b.name);
            case SortParams.NAME_DESC:
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    }
}