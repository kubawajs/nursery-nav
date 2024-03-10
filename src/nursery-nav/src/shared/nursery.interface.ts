export interface Institution {
    institutionType: string,
    name: string,
    website: string,
    email: string,
    phone: string,
    capacity: number,
    kidsEnrolled: number,
    basicPricePerMonth: number,
    extendedStayOver10H?: number,
    basicPricePerHour?: number,
    foodPricePerMonth?: number,
    foodPricePerDay?: number,
    discounts?: string[],
    openingHours: string,
    isAdaptedToDisabledChildren: boolean,
    operatingEntity: OperatingEntity,
    businessActivitySuspended: boolean,
    address: Address
}

export interface OperatingEntity {
    name: string,
    address: string,
    nip: string,
    regon: string,
    regNoPosition: string,
    website: string
}

export interface Address {
    voidodeship: string,
    county: string,
    city: string,
    fullAddress: string,
    pin: {
        latitude: number,
        longitude: number
    }
}