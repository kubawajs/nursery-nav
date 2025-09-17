import { Inject, Injectable, Logger, Optional } from "@nestjs/common";
import { LocationDto } from "./DTO/locationDto";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { InjectModel } from "@nestjs/mongoose";
import { Institution } from "../shared/schemas/institution.schema";
import { Model } from "mongoose";
import { ConfigService } from '@nestjs/config';
import { InstitutionType } from "../shared/models/institutionType";

@Injectable()
export class LocationsMongoDbService {
    private readonly logger = new Logger(LocationsMongoDbService.name);
    private readonly cacheTTL: number;

    constructor(
        @InjectModel(Institution.name) private institutionModel: Model<Institution>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        // make ConfigService optional so tests that don't import ConfigModule won't fail
        @Optional() private configService?: ConfigService
    ) {
        this.cacheTTL = this.configService?.get<number>('CACHE_TTL') || 3600;
        if (this.configService) {
            this.verifyRedisConnection();
        }
    }

    async findAll(): Promise<LocationDto[]> {
        const CACHE_KEY = 'locations:all';

        try {
            // Try to get from cache
            const cachedData = await this.cacheManager.get<LocationDto[]>(CACHE_KEY);

            if (cachedData) {
                this.logger.debug(`Cache hit for key: ${CACHE_KEY}`);
                return cachedData;
            }

            this.logger.debug(`Cache miss for key: ${CACHE_KEY}`);

            // Query database if cache miss
            const locations = await this.institutionModel
                .find({}, {
                    id: 1,
                    institutionType: 1,
                    'address.pin': 1,
                    _id: 0
                })
                .lean()
                .exec();

            const locationsDto = locations.map(location => ({
                institutionType: location.institutionType as InstitutionType,
                id: location.id,
                longitude: location.address?.pin?.longitude,
                latitude: location.address?.pin?.latitude
            }));

            // Set cache with explicit TTL
            this.logger.debug(`Setting cache for key: ${CACHE_KEY}`);
            await this.cacheManager.set(CACHE_KEY, locationsDto, this.cacheTTL);

            return locationsDto;
        } catch (error) {
            this.logger.error('Error in findAll:', error);

            // If cache operations fail, still return database result
            const locations = await this.institutionModel
                .find({}, {
                    id: 1,
                    institutionType: 1,
                    'address.pin': 1,
                    _id: 0
                })
                .lean()
                .exec();

            return locations.map(location => ({
                institutionType: location.institutionType as InstitutionType,
                id: location.id,
                longitude: location.address?.pin?.longitude,
                latitude: location.address?.pin?.latitude
            }));
        }
    }

    private async verifyRedisConnection() {
        try {
            await this.cacheManager.set('test:locations', 'test', 10);
            const testResult = await this.cacheManager.get('test:locations');
            this.logger.log(`Redis connection test: ${testResult === 'test' ? 'successful' : 'failed'}`);
        } catch (error) {
            this.logger.error('Redis connection failed:', error);
        }
    }
}