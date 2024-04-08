import { Injectable } from '@nestjs/common';
import { Institution } from './interfaces/institution.interface';
import * as data from '../../data/test-data-100.json';

@Injectable()
export class InstitutionsService {
    private institutions: Institution[];

    constructor() {
        this.institutions = data as unknown as Institution[];
    }

    findAll(): Promise<Institution[]> {
        if (data) {
            return Promise.resolve(this.institutions);
        }

        return Promise.resolve([]);
    }
}