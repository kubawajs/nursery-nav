import { Injectable } from "@nestjs/common";
import { LocationDto } from "./DTO/locationDto";
import { env } from "process";
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
            const data = require('../../data/test-data-1000.json');
            this.locations = data.map((location: {
                name: string;
                institutionType: InstitutionType; operatingEntity: { regNoPosition: string; }; address: { pin: { longitude: number; latitude: number; }; };
            }) => {
                return {
                    institutionType: location.institutionType,
                    regNo: location.operatingEntity.regNoPosition,
                    name: location.name,
                    longitude: location.address.pin.longitude,
                    latitude: location.address.pin.latitude
                };
            });
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }
}