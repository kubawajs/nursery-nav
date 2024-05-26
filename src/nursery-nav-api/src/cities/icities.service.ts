import { CityDto } from "./DTO/cityDto";

export interface ICitiesService {
    findAll(): Promise<CityDto[]>;
}

export const ICitiesService = Symbol('ICitiesService');