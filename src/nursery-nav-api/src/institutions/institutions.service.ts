import { Injectable } from '@nestjs/common';
import { Institution } from './interfaces/institution.interface';

@Injectable()
export class InstitutionsService {
    findAll(): Promise<Institution[]> {
        return Promise.resolve([]);
    }
}