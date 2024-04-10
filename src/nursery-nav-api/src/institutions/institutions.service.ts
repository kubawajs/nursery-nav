import { Injectable } from '@nestjs/common';
import { Institution } from './interfaces/institution.interface';
import { InstitutionListItem } from './interfaces/institutionlistitem.interface';
import { InstitutionType } from './interfaces/institutiontype.interface';
import { PaginatedResult } from 'src/shared/interfaces/paginatedresult.interface';
import * as data from '../../data/test-data-100.json';

@Injectable()
export class InstitutionsService {
    private institutions: Institution[];

    constructor() {
        this.institutions = data as unknown as Institution[];
    }

    async findAll(page: number, size: number): Promise<PaginatedResult<InstitutionListItem>> {
        const totalPages = this.institutions?.length ? Math.ceil(this.institutions.length / size) : 0;
        page = this.setPage(page, totalPages);
        size = this.setPageSize(size);

        const paginatedResult: PaginatedResult<InstitutionListItem> = {
            items: [],
            totalItems: data?.length ?? 0,
            pageIndex: page,
            pageSize: size,
            totalPages: totalPages
        };
        if (data) {
            const pageData = this.institutions.slice((page - 1) * size, page * size);
            const institutionList = pageData.map((institution) => {
                const institutionListItem: InstitutionListItem = this.MapToInstutionListItem(institution);
                return institutionListItem;
            });
            paginatedResult.items = institutionList;
            return Promise.resolve(paginatedResult);
        }

        return Promise.resolve(paginatedResult);
    }

    async getById(regNo: string): Promise<Institution> {
        const institution = this.institutions.find((institution) => institution.operatingEntity.regNoPosition === regNo);
        if (institution) {
            return Promise.resolve(institution);
        }

        return Promise.reject(`Institution with id ${regNo} not found`);
    }

    private setPage(page: number, totalPages: number): number {
        page = page < 1 ? 1 : page;
        page = page > totalPages ? totalPages : page;
        return page;
    }

    private setPageSize(size: number): number {
        size = size < 1 ? 10 : size;
        size = size > 100 ? 100 : size;
        return size;
    }

    private MapToInstutionListItem(institution: Institution): InstitutionListItem {
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
}