import { Injectable } from '@nestjs/common';
import { Institution } from './interfaces/institution.interface';
import { InstitutionType } from './interfaces/institutiontype.interface';
import data from '../../data/test-data-100.json';

@Injectable()
export class InstitutionsService {
    findAll(): Promise<Institution[]> {
        const institutions = data as unknown as Institution[];
        console.log(data);
        if (data) {
            console.log("hello from data");
            return Promise.resolve(institutions);
        }

        return Promise.resolve([]);
    }
}