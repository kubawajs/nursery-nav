import axios from "axios";

export const fetchFromApi = async <T>(url: string, params?: object): Promise<T> => {
    const { data, status } = await axios.get<T>(url, { params });

    if (status !== 200) {
        throw new Error(`Failed to fetch data from ${url}. Status: ${status}`);
    }

    return data;
};
