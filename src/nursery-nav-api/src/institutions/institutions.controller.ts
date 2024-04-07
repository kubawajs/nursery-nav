import { Controller, Get, HttpCode } from '@nestjs/common';
import { Institution } from './interfaces/institution.interface';
import { InstitutionsService } from './institutions.service';

@Controller('institutions')
export class InstitutionsController {
    constructor(private readonly institutionsService: InstitutionsService) { }

    @Get()
    @HttpCode(200)
    findAll(): Promise<Institution[]> {
        return this.institutionsService.findAll();
    }
}
