import { Address } from "./address.interface";
import { InstitutionType } from "./institutiontype.interface";

export interface InstitutionListItem {
    institutionType: InstitutionType;
    name: string;
    website: string;
    email: string;
    phone: string;
    basicPricePerMonth: number;
    isAdaptedToDisabledChildren: boolean;
    city: string;
}