import { Institution, InstitutionListItem } from "../shared/nursery.interface";
import { fetchFromApi } from './fetcher';

export interface getInstitutionsResponse {
    items: InstitutionListItem[],
    ids: number[],
    totalItems: number,
    totalPages: number
}

export interface getInstitutionsAutocompleteResponse {
    id: number,
    name: string
}

const API_URL = import.meta.env.VITE_APP_API_URL;

export const getInstitutions = async (
    searchParams: URLSearchParams,
    pageNum?: number | null
): Promise<getInstitutionsResponse> => {
    const url = `${API_URL}/institutions`;
    const params = { page: pageNum || undefined, ...Object.fromEntries(searchParams) };

    return fetchFromApi<getInstitutionsResponse>(url, params);
};

export const getInstitutionDetails = async (id: number): Promise<Institution> => {
    const url = `${API_URL}/institutions/details/${id}`;
    return fetchFromApi<Institution>(url);
};

export const getInstitutionsDetails = async (ids: number[]): Promise<Institution[]> => {
    const url = `${API_URL}/institutions/details`;
    const params = { id: ids };

    return fetchFromApi<Institution[]>(url, params);
};

export const getInstitutionAutocomplete = async (search: string): Promise<getInstitutionsAutocompleteResponse[]> => {
    const url = `${API_URL}/institutions/autocomplete`;
    const params = { search };

    return fetchFromApi<getInstitutionsAutocompleteResponse[]>(url, params);
};

export { }
