export interface Address {
    voivodeship: string;
    county: string;
    city: string;
    fullAddress: string;
    pin: {
        latitude: number;
        longitude: number;
    };
}
