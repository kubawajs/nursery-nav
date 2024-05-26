import { Controller, Get, HttpCode, Inject, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocationDto } from './DTO/locationDto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ILocationsService } from './ilocations.service';

@Controller('locations')
@UseInterceptors(CacheInterceptor)
export class LocationsController {
    constructor(@Inject(ILocationsService) private readonly locationsService: ILocationsService) { }

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Returns a list of locations' })
    @ApiTags('nursery-nav')
    async findAll(): Promise<LocationDto[]> {
        return await this.locationsService.findAll();
    }
}
