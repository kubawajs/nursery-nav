import { fetchFromApi } from './fetcher';

export interface getCitiesResponse {
    city: string;
    voivodeship: string;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

export const getCities = async (): Promise<getCitiesResponse[]> => {
    const url = `${API_URL}/cities`;

    return fetchFromApi<getCitiesResponse[]>(url);
}

export { }
