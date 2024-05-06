import { Injectable } from "@nestjs/common";
import { LocationDto } from "./DTO/locationDto";
import { InstitutionType } from "../shared/models/institutionType";

@Injectable()
export class LocationsService {
    private locations: LocationDto[];

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