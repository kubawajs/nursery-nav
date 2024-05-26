import { Injectable, Inject } from "@nestjs/common";
import { CityDto } from "./DTO/cityDto";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { ICitiesService } from "./icities.service";

@Injectable()
export class CitiesDocumentService implements ICitiesService {
    private locations: CityDto[];

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
        this.loadData();
    }

    async findAll() {
        const CACHE_KEY = 'CitiesService_findAll';
        const cacheData = await this.cacheManager.get(CACHE_KEY) as CityDto[];
        if (cacheData) {
            return Promise.resolve(cacheData);
        }

        await this.cacheManager.set(CACHE_KEY, this.locations);
        return Promise.resolve(this.locations);
    }

    private async loadData() {
        try {
            const data = require('../../data/22052024-RZ-instytucje-enriched.json');
            this.locations = data.map((location: {
                address: { city: string; county: string; voivodeship: string; };
            }) => {
                return {
                    city: location.address.city,
                    county: location.address.county,
                    voivodeship: location.address.voivodeship
                };
            });

            this.locations = this.locations.filter((location, index, self) =>
                index === self.findIndex((t) => (
                    t.city === location.city && t.county === location.county && t.voivodeship === location.voivodeship
                ))
            );
            this.locations.sort((a, b) => a.city.localeCompare(b.city));
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }
}