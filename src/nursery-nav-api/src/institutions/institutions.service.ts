import { Injectable } from '@nestjs/common';
import { Institution } from './interfaces/institution.interface';
import * as data from '../../data/test-data-100.json';

@Injectable()
export class InstitutionsService {
    private institutions: Institution[];

    constructor() {
        this.institutions = data as unknown as Institution[];
    }

    async findAll(): Promise<Institution[]> {
        if (data) {
            return Promise.resolve(this.institutions);
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