import { Controller, Get, HttpCode } from '@nestjs/common';
import { Institution } from './interfaces/institution.interface';
import { InstitutionsService } from './institutions.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('institutions')
export class InstitutionsController {
    constructor(private readonly institutionsService: InstitutionsService) { }

    @Get()
    @HttpCode(200)
    @ApiTags('nursery-nav')
    findAll(): Promise<Institution[]> {
        return this.institutionsService.findAll();
    }
}
