import { Injectable } from '@nestjs/common';
import { Institution } from './interfaces/institution.interface';
import { InstitutionListItem } from './interfaces/institutionlistitem.interface';
import { InstitutionType } from './interfaces/institutiontype.interface';
import * as data from '../../data/test-data-100.json';

@Injectable()
export class InstitutionsService {
    private institutions: Institution[];

    constructor() {
        this.institutions = data as unknown as Institution[];
    }

    async findAll(): Promise<InstitutionListItem[]> {
        if (data) {
            const institutionList = data.map((institution) => {
                const institutionListItem: InstitutionListItem = {
                    institutionType: institution.institutionType as InstitutionType,
                    name: institution.name,
                    website: institution.website,
                    email: institution.email,
                    phone: institution.phone,
                    basicPricePerMonth: institution.basicPricePerMonth,
                    isAdaptedToDisabledChildren: institution.isAdaptedToDisabledChildren,
                    city: institution.address.city
                };
                return institutionListItem;
            });
            return Promise.resolve(institutionList);
        }

        return Promise.resolve([]);
    }

    async getById(regNo: string): Promise<Institution> {
        const institution = this.institutions.find((institution) => institution.operatingEntity.regNoPosition === regNo);
        console.log(institution);
        if (institution) {
            return Promise.resolve(institution);
        }

        return Promise.reject(`Institution with id ${regNo} not found`);
    }
}