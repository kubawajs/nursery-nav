import { Inject, Injectable } from "@nestjs/common";
import { LocationDto } from "./DTO/locationDto";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { InjectModel } from "@nestjs/mongoose";
import { Institution } from "../shared/schemas/institution.schema";
import { Model } from "mongoose";

@Injectable()
export class LocationsMongoDbService {
    constructor(
        @InjectModel(Institution.name) private institutionModel: Model<Institution>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async findAll(): Promise<LocationDto[]> {
        const CACHE_KEY = 'LocationsService_findAll';
        const cacheData = await this.cacheManager.get(CACHE_KEY) as LocationDto[];
        if (cacheData) {
            return cacheData;
        }

        const locations = await this.institutionModel.find({}, { id: 1, institutionType: 1, 'address.pin': 1 }).exec();
        const locationsDto = locations.map(location => {
            return {
                institutionType: location.institutionType,
                id: location.id,
                name: location.name, // Add the 'name' property
                longitude: location.address.pin.longitude,
                latitude: location.address.pin.latitude
            } as LocationDto;
        });

        await this.cacheManager.set(CACHE_KEY, locationsDto);
        return locationsDto;
    }
}