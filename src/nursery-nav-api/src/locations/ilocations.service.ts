import { LocationDto } from "./DTO/locationDto";

export interface ILocationsService {
    findAll(): Promise<LocationDto[]>;
}

export const ILocationsService = Symbol('ILocationsService');