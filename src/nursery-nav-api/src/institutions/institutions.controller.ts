import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { InstitutionDto } from './interfaces/institutionDto';
import { InstitutionsService } from './institutions.service';
import { ApiParam, ApiProduces, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InstitutionListItemDto } from './interfaces/institutionListItemDto';
import { PaginatedResult } from 'src/shared/interfaces/paginatedresult';

@Controller('institutions')
export class InstitutionsController {
    constructor(private readonly institutionsService: InstitutionsService) { }

    @Get()
    @HttpCode(200)
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'size', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Returns a paginated list of institutions', type: PaginatedResult<InstitutionListItemDto> })
    @ApiTags('nursery-nav')
    async findAll(@Query('page') page: number, @Query('size') size: number): Promise<PaginatedResult<InstitutionListItemDto>> {
        return await this.institutionsService.findAll(page, size);
    }

    @Get(':regNo')
    @HttpCode(200)
    @HttpCode(404)
    @ApiResponse({ status: 200, description: 'Returns an institution by regNo', type: InstitutionDto })
    @ApiParam({ name: 'regNo', description: 'The regNo of the institution', required: true })
    @ApiTags('nursery-nav')
    async getById(@Param() params: any): Promise<InstitutionDto> {
        return await this.institutionsService.getById(params.regNo);
    }
}
