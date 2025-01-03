import { fetchFromApi } from './fetcher';
import { LocationResponse } from "../shared/nursery.interface";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const getLocations = async (): Promise<LocationResponse[]> => {
    const url = `${API_URL}/locations`;

    return fetchFromApi<LocationResponse[]>(url);
}

export { }
