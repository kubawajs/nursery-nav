import { Injectable, Inject, Logger } from "@nestjs/common";
import { CityDto } from "./DTO/cityDto";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { InjectModel } from "@nestjs/mongoose";
import { City } from "../shared/schemas/city.schema";
import { Model } from "mongoose";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CitiesMongoDbService {
    private readonly logger = new Logger(CitiesMongoDbService.name);
    private readonly cacheTTL: number;
    private readonly CACHE_KEY = 'cities:all';

    constructor(
        @InjectModel(City.name) private cityModel: Model<City>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private configService: ConfigService
    ) {
        this.cacheTTL = this.configService.get<number>('CACHE_TTL') || 3600;
        this.verifyRedisConnection();
    }

    async findAll(): Promise<CityDto[]> {
        try {
            // Try to get from cache
            const cachedData = await this.cacheManager.get<CityDto[]>(this.CACHE_KEY);

            if (cachedData) {
                this.logger.debug(`Cache hit for key: ${this.CACHE_KEY}`);
                return cachedData;
            }

            this.logger.debug(`Cache miss for key: ${this.CACHE_KEY}`);

            // Query database if cache miss
            const cities = await this.cityModel
                .find()
                .sort({ city: 1 })
                .select('city county community voivodeship -_id')
                .lean()
                .exec();

            const citiesDto = cities.map(city => ({
                city: city.city,
                county: city.county,
                community: city.community,
                voivodeship: city.voivodeship
            }));

            // Set cache with explicit TTL
            this.logger.debug(`Setting cache for key: ${this.CACHE_KEY}`);
            await this.cacheManager.set(
                this.CACHE_KEY,
                citiesDto,
                this.cacheTTL
            );

            return citiesDto;
        } catch (error) {
            this.logger.error('Error in findAll:', error);

            // If cache operations fail, still return database result
            const cities = await this.cityModel
                .find()
                .sort({ city: 1 })
                .select('city county community voivodeship -_id')
                .lean()
                .exec();

            return cities.map(city => ({
                city: city.city,
                county: city.county,
                community: city.community,
                voivodeship: city.voivodeship
            }));
        }
    }

    private async verifyRedisConnection() {
        try {
            await this.cacheManager.set('test:cities', 'test', 10);
            const testResult = await this.cacheManager.get('test:cities');
            this.logger.log(`Redis connection test: ${testResult === 'test' ? 'successful' : 'failed'}`);
        } catch (error) {
            this.logger.error('Redis connection failed:', error);
        }
    }
}