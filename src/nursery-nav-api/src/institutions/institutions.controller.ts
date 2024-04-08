import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { Institution } from './interfaces/institution.interface';
import { InstitutionsService } from './institutions.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('institutions')
export class InstitutionsController {
    constructor(private readonly institutionsService: InstitutionsService) { }

    @Get()
    @HttpCode(200)
    @ApiTags('nursery-nav')
    async findAll(): Promise<Institution[]> {
        return await this.institutionsService.findAll();
    }

    @Get(':regNo')
    @HttpCode(200)
    @HttpCode(404)
    @ApiTags('nursery-nav')
    async getById(@Param() params: any): Promise<Institution> {
        return await this.institutionsService.getById(params.regNo);
    }
}
