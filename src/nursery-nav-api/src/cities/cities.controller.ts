import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { CityDto } from './DTO/cityDto';

@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) { }

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Returns a list of cities', type: CityDto })
    @ApiTags('nursery-nav')
    async findAll(): Promise<CityDto[]> {
        return await this.citiesService.findAll();
    }
}
