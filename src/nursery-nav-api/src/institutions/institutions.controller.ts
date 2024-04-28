import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { InstitutionDto } from './DTO/institutionDto';
import { InstitutionsService } from './institutions.service';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InstitutionListItemDto } from './DTO/institutionListItemDto';
import PaginatedResult from '../shared/models/paginatedresult';
import { SortParams } from './params/sortParams';

@Controller('institutions')
export class InstitutionsController {
    constructor(private readonly institutionsService: InstitutionsService) { }

    @Get()
    @HttpCode(200)
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'size', required: false, type: Number })
    @ApiQuery({ name: 'sort', required: false, enum: SortParams })
    @ApiQuery({ name: 'city', required: false, type: String })
    @ApiQuery({ name: 'voivodeship', required: false, type: String })
    @ApiQuery({ name: 'priceMin', required: false, type: Number })
    @ApiQuery({ name: 'priceMax', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Returns a sorted and paginated list of institutions', type: PaginatedResult<InstitutionListItemDto> })
    @ApiTags('nursery-nav')
    async findAll(
        @Query('page') page: number,
        @Query('size') size: number,
        @Query('city') city: string,
        @Query('voivodeship') voivodeship: string,
        @Query('priceMin') priceMin: number,
        @Query('priceMax') priceMax: number,
        @Query('sort') sort: SortParams = SortParams.NAME_ASC)
        : Promise<PaginatedResult<InstitutionListItemDto>> {
        return await this.institutionsService.findAll(page, size, sort, city, voivodeship, priceMin, priceMax);
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
