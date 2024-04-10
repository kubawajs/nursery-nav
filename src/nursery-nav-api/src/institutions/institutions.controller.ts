import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { Institution } from './interfaces/institution.interface';
import { InstitutionsService } from './institutions.service';
import { ApiTags } from '@nestjs/swagger';
import { InstitutionListItem } from './interfaces/institutionlistitem.interface';
import { PaginatedResult } from 'src/shared/interfaces/paginatedresult.interface';

@Controller('institutions')
export class InstitutionsController {
    constructor(private readonly institutionsService: InstitutionsService) { }

    @Get()
    @HttpCode(200)
    @ApiTags('nursery-nav')
    async findAll(@Query('page') page: number, @Query('size') size: number): Promise<PaginatedResult<InstitutionListItem>> {
        return await this.institutionsService.findAll(page, size);
    }

    @Get(':regNo')
    @HttpCode(200)
    @HttpCode(404)
    @ApiTags('nursery-nav')
    async getById(@Param() params: any): Promise<Institution> {
        return await this.institutionsService.getById(params.regNo);
    }
}
