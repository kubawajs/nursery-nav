import { Address } from "./address.interface";
import { InstitutionType } from "./institutiontype.interface";
import { OperatingEntity } from "./operatingentity.interface";

export interface Institution {
    // institutionType: InstitutionType;
    name: string;
    website: string;
    email: string;
    phone: string;
    capacity: number;
    kidsEnrolled: number;
    basicPricePerMonth: number;
    extendedStayOver10H?: number;
    basicPricePerHour?: number;
    foodPricePerMonth?: number;
    foodPricePerDay?: number;
    discounts?: string[];
    openingHours: string;
    isAdaptedToDisabledChildren: boolean;
    operatingEntity: OperatingEntity;
    businessActivitySuspended: boolean;
    address: Address;
}


