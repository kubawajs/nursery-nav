import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocationDto } from './DTO/locationDto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) { }

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Returns a list of locations' })
    @ApiTags('nursery-nav')
    async findAll(): Promise<LocationDto[]> {
        return await this.locationsService.findAll();
    }
}
