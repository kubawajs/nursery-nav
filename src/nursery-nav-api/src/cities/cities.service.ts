import { Injectable } from "@nestjs/common";
import { CityDto } from "./DTO/cityDto";

@Injectable()
export class CitiesService {
    private locations: CityDto[];

    constructor() {
        this.loadData();
    }

    async findAll() {
        return Promise.resolve(this.locations);
    }

    private async loadData() {
        try {
            const data = require('../../data/052024-RZ-instytucje-enriched.json');
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