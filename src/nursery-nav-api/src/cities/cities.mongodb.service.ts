import { Injectable, Inject } from "@nestjs/common";
import { CityDto } from "./DTO/cityDto";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { ICitiesService } from "./icities.service";
import { InjectModel } from "@nestjs/mongoose";
import { City } from "../shared/schemas/city.schema";
import { Model } from "mongoose";

@Injectable()
export class CitiesMongoDbService implements ICitiesService {
    constructor(
        @InjectModel(City.name) private cityModel: Model<City>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async findAll(): Promise<CityDto[]> {
        const CACHE_KEY = 'CitiesService_findAll';
        const cacheData = await this.cacheManager.get(CACHE_KEY) as CityDto[];
        if (cacheData) {
            return Promise.resolve(cacheData);
        }

        const cities = await this.cityModel.find().exec();
        const citiesDto = cities.map(city => {
            return {
                city: city.city,
                county: city.county,
                voivodeship: city.voivodeship
            };
        });
        await this.cacheManager.set(CACHE_KEY, citiesDto);
        return citiesDto;
    }
}