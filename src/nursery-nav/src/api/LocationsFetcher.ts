import axios from "axios";
import { LocationResponse } from "../shared/nursery.interface";

export const getLocations = async (): Promise<LocationResponse[]> => {
    const url = `${process.env.REACT_APP_API_URL}/locations`;
    const res = await axios.get(url);
    if (res.status !== 200) {
        throw new Error('Failed to fetch locations');
    }

    const data = res.data as LocationResponse[];
    return data;
}

export { }
