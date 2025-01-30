import { Controller, Get, HttpCode, Inject, Param, Query, UseInterceptors, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import PaginatedResult from '../shared/models/paginatedresult';
import { SortParams } from './params/sortParams';
import { InstitutionType } from '../shared/models/institutionType';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { InstitutionAutocompleteDto } from './DTO/institutionAutocompleteDto';
import { InstitutionDto } from './DTO/institutionDto';
import { InstitutionListItemDto } from './DTO/institutionListItemDto';
import { InstitutionsMongoDbService } from './institutions.mongodb.service';

@Controller('institutions')
@UseInterceptors(CacheInterceptor)
export class InstitutionsController {
    constructor(@Inject(InstitutionsMongoDbService) private readonly institutionsService: InstitutionsMongoDbService) { }

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
        const params = { page, size, sort, city, voivodeship, insType, priceMin, priceMax };
        return await this.institutionsService.findAll(params);
    }

    @Get('details/:id')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Returns an institution by id', type: InstitutionDto })
    @ApiResponse({ status: 404, description: 'Institution not found' })
    @ApiParam({ name: 'id', description: 'The id of the institution', required: true })
    @ApiTags('nursery-nav')
    async getById(@Param() params: any): Promise<InstitutionDto> {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            throw new BadRequestException('Id parameter must be a correct number');
        }

        try {
            const result = await this.institutionsService.getById(id);
            if (!result) {
                throw new NotFoundException(`Institution with id ${id} not found`);
            }
            return result;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException(`Institution with id ${id} not found`);
        }
    }

    @Get('details')
    @HttpCode(200)
    @ApiQuery({ name: 'id', required: true, type: [Number], isArray: true })
    @ApiResponse({ status: 200, description: 'Returns a list of institutions by ids. Maximum 5 ids.' })
    @ApiResponse({ status: 400, description: 'Maximum 5 ids can be passed' })
    @ApiTags('nursery-nav')
    async getByIds(@Query('id') ids: number[]): Promise<InstitutionDto[]> {
        if (ids.length > 5) {
            throw new BadRequestException('Maximum 5 ids can be passed');
        }

        try {
            return await this.institutionsService.getByIds(ids.map(id => Number(id)));
        } catch (error) {
            throw new NotFoundException('Institutions not found');
        }
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