import axios from "axios";
import { Institution, InstitutionListItem } from "../shared/nursery.interface";

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

export const getInstitutions = async (searchParams: URLSearchParams, pageNum?: number | null): Promise<getInstitutionsResponse> => {
    let url = `${process.env.REACT_APP_API_URL}/institutions`;
    if (pageNum) {
        url += `?page=${pageNum}&${searchParams}`;
    }
    else {
        url += `?${searchParams}`;
    }

    const res = await axios.get(url);
    if (res.status !== 200) {
        throw new Error('Failed to fetch institutions');
    }

    const data = res.data as getInstitutionsResponse;
    return data;
}

export const getInstitutionDetails = async (id: number): Promise<Institution> => {
    const url = `${process.env.REACT_APP_API_URL}/institutions/details/${id}`;
    const res = await axios.get(url);
    if (res.status !== 200) {
        throw new Error('Failed to fetch institution details');
    }

    const data = res.data as Institution;
    return data;
}

export const getInstitutionsDetails = async (ids: number[]): Promise<Institution[]> => {
    const url = `${process.env.REACT_APP_API_URL}/institutions/details?id=${ids.join('&id=')}`;
    const res = await axios.get(url);
    if (res.status !== 200) {
        throw new Error('Failed to fetch institution details');
    }

    const data = res.data as Institution[];
    return data;
}

export const getInstitutionAutocomplete = async (search: string): Promise<getInstitutionsAutocompleteResponse[]> => {
    const url = `${process.env.REACT_APP_API_URL}/institutions/autocomplete?search=${search}`;
    const res = await axios.get(url);
    if (res.status !== 200) {
        throw new Error('Failed to fetch institution autocomplete');
    }

    const data = res.data as getInstitutionsAutocompleteResponse[];
    return data;
}

export { }