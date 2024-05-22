import { Inject, Injectable } from "@nestjs/common";
import { LocationDto } from "./DTO/locationDto";
import { InstitutionType } from "../shared/models/institutionType";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { env } from "process";

@Injectable()
export class LocationsService {
    private locations: LocationDto[];

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
        this.loadData();
    }

    async findAll() {
        const CACHE_KEY = 'LocationsService_findAll';
        const cacheData = await this.cacheManager.get(CACHE_KEY) as LocationDto[];
        if (cacheData) {
            return cacheData;
        }

        await this.cacheManager.set(CACHE_KEY, this.locations);
        return Promise.resolve(this.locations);
    }

    private async loadData() {
        try {
            const data = require('../../data/22052024-RZ-instytucje-enriched.json');
            this.locations = data.map((location: {
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
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }
}