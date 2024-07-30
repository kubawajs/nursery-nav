import axios from "axios";

export interface getCitiesResponse {
    city: string;
    voivodeship: string;
}

export const getCities = async (): Promise<getCitiesResponse[]> => {
    const url = `${process.env.REACT_APP_API_URL}/cities`;
    const res = await axios.get(url);
    if (res.status !== 200) {
        throw new Error('Failed to fetch cities');
    }

    const data = res.data as getCitiesResponse[];
    return data;
}

export { }