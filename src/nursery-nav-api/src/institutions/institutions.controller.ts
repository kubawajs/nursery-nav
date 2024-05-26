import { Controller, Get, HttpCode, Inject, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import PaginatedResult from '../shared/models/paginatedresult';
import { SortParams } from './params/sortParams';
import { InstitutionType } from '../shared/models/institutionType';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { IInstitutionsService } from './iinstitutions.service';
import { InstitutionAutocompleteDto } from './DTO/institutionAutocompleteDto';
import { InstitutionDto } from './DTO/institutionDto';
import { InstitutionListItemDto } from './DTO/institutionListItemDto';

@Controller('institutions')
@UseInterceptors(CacheInterceptor)
export class InstitutionsController {
    constructor(@Inject(IInstitutionsService) private readonly institutionsService: IInstitutionsService) { }

    @Get()
    @HttpCode(200)
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'size', required: false, type: Number })
    @ApiQuery({ name: 'sort', required: false, enum: SortParams })
    @ApiQuery({ name: 'city', required: false, type: String })
    @ApiQuery({ name: 'voivodeship', required: false, type: String })
    @ApiQuery({ name: 'insType', required: false, enum: InstitutionType, isArray: true })
    @ApiQuery({ name: 'priceMin', required: false, type: Number })
    @ApiQuery({ name: 'priceMax', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Returns a sorted and paginated list of institutions', type: PaginatedResult<InstitutionListItemDto> })
    @ApiTags('nursery-nav')
    async findAll(
        @Query('page') page: number,
        @Query('size') size: number,
        @Query('city') city: string,
        @Query('voivodeship') voivodeship: string,
        @Query('insType') insType: InstitutionType[],
        @Query('priceMin') priceMin: number,
        @Query('priceMax') priceMax: number,
        @Query('sort') sort: SortParams = SortParams.NAME_ASC)
        : Promise<PaginatedResult<InstitutionListItemDto>> {
        return await this.institutionsService.findAll(page, size, sort, city, voivodeship, insType, priceMin, priceMax);
    }

    @Get('details/:id')
    @HttpCode(200)
    @HttpCode(404)
    @ApiResponse({ status: 200, description: 'Returns an institution by id', type: InstitutionDto })
    @ApiParam({ name: 'id', description: 'The id of the institution', required: true })
    @ApiTags('nursery-nav')
    async getById(@Param() params: any): Promise<InstitutionDto> {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return Promise.reject('Id parameter must be a correct number');
        }
        return await this.institutionsService.getById(id);
    }

    @Get('autocomplete')
    @HttpCode(200)
    @ApiQuery({ name: 'search', required: true, type: String })
    @ApiResponse({ status: 200, description: 'Returns a list of institutions that match the search query', type: [InstitutionListItemDto] })
    @ApiTags('nursery-nav')
    async autocomplete(@Query('search') search: string): Promise<InstitutionAutocompleteDto[]> {
        return await this.institutionsService.getInstitutionsAutocomplete(search);
    }
}
