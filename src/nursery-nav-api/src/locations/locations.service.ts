import { Injectable } from "@nestjs/common";
import { LocationDto } from "./DTO/locationDto";
import { env } from "process";

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
            this.locations = data.map((location: { operatingEntity: { regNoPosition: string; }; address: { pin: { longitude: number; latitude: number; }; }; }) => {
                return {
                    regNo: location.operatingEntity.regNoPosition,
                    longitude: location.address.pin.longitude,
                    latitude: location.address.pin.latitude
                };
            });
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }
}