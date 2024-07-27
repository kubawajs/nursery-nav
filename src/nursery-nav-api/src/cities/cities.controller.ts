import { Controller, Get, HttpCode, Inject, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CityDto } from './DTO/cityDto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CitiesMongoDbService } from './cities.mongodb.service';

@Controller('cities')
@UseInterceptors(CacheInterceptor)
export class CitiesController {
    constructor(@Inject(CitiesMongoDbService) private readonly citiesService: CitiesMongoDbService) { }

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Returns a list of cities', type: CityDto })
    @ApiTags('nursery-nav')
    async findAll(): Promise<CityDto[]> {
        return await this.citiesService.findAll();
    }
}
