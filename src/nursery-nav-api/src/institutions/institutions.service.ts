import { Injectable } from '@nestjs/common';
import { InstitutionDto } from './DTO/institutionDto';
import { InstitutionListItemDto } from './DTO/institutionListItemDto';
import { InstitutionType } from './DTO/institutionType';
import PaginatedResult from '../shared/models/paginatedresult';
import * as data from '../../data/test-data-100.json';
import { SortParams } from './params/sortParams';

@Injectable()
export class InstitutionsService {
    private institutions: InstitutionDto[];

    constructor() {
        this.institutions = data as unknown as InstitutionDto[];
    }

    async findAll(page: number, size: number, sort: SortParams): Promise<PaginatedResult<InstitutionListItemDto>> {
        size = this.setPageSize(size);
        const totalPages = this.institutions?.length ? Math.ceil(this.institutions.length / size) : 0;
        page = this.setPage(page, totalPages);

        const paginatedResult: PaginatedResult<InstitutionListItemDto> = {
            items: [],
            totalItems: data?.length ?? 0,
            pageIndex: page,
            pageSize: size,
            totalPages: totalPages
        };
        if (data) {
            const sortedInstutions = [].slice.call(this.institutions).sort((a, b) => { return this.SortMethod(sort, a, b); });
            const pageData = sortedInstutions.slice((page - 1) * size, page * size);
            const institutionList = pageData.map((institution) => {
                const institutionListItem: InstitutionListItemDto = this.MapToInstutionListItem(institution);
                return institutionListItem;
            });
            paginatedResult.items = institutionList;
            return Promise.resolve(paginatedResult);
        }

        return Promise.resolve(paginatedResult);
    }

    async getById(regNo: string): Promise<InstitutionDto> {
        const institution = this.institutions.find((institution) => institution.operatingEntity.regNoPosition === regNo);
        if (institution) {
            return Promise.resolve(institution);
        }

        return Promise.reject(`Institution with id ${regNo} not found`);
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

    private MapToInstutionListItem(institution: InstitutionDto): InstitutionListItemDto {
        return {
            institutionType: institution.institutionType as InstitutionType,
            name: institution.name,
            website: institution.website,
            email: institution.email,
            phone: institution.phone,
            basicPricePerMonth: institution.basicPricePerMonth,
            isAdaptedToDisabledChildren: institution.isAdaptedToDisabledChildren,
            city: institution.address.city
        };
    }

    private SortMethod(sort: SortParams, a: InstitutionDto, b: InstitutionDto) {
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