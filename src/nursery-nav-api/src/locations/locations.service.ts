import { Inject, Injectable } from "@nestjs/common";
import { LocationDto } from "./DTO/locationDto";
import { InstitutionType } from "../shared/models/institutionType";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { env } from "process";

@Injectable()
export class LocationsService {
    private locations: LocationDto[];
    private CACHE_KEY = 'LocationsService_findAll';

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
        (async () => {
            this.locations = await this.loadData();
        })();
    }

    async findAll() {
        return Promise.resolve(this.locations);
    }

    private async loadData() {
        const cacheData = await this.cacheManager.get(this.CACHE_KEY);
        if (cacheData) {
            console.log('returning from cache:', this.CACHE_KEY);
            return cacheData;
        }
        try {
            const data = require('../../data/052024-RZ-instytucje-enriched.json');
            const locationsData = data.map((location: {
                institutionType: InstitutionType;
                id: number;
                address: { pin: { longitude: number; latitude: number; }; };
            }) => {
                return {
                    institutionType: location.institutionType,
                    id: location.id,
                    longitude: location.address.pin.longitude,
                    latitude: location.address.pin.latitude
                };
            });
            console.log('Saving to cache with key:', this.CACHE_KEY);
            await this.cacheManager.set('locations_data', locationsData, Number(env.CACHE_TTL));
            return locationsData;
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }
}