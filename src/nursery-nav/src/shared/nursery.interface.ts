export interface Institution {
	institutionType: InstitutionType;
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

export interface InstitutionListItem {
	regNo: string;
	institutionType: InstitutionType;
	name: string;
	website: string;
	email: string;
	phone: string;
	basicPricePerMonth: number;
	isAdaptedToDisabledChildren: boolean;
	city: string;
}

export enum InstitutionType {
	NURSERY = 'NURSERY',
	CHILDCLUB = 'CHILDCLUB'
}

export interface InstitutionAutocomplete {
	name: string;
	regNoPosition: string;
}

export interface OperatingEntity {
	name: string;
	address: string;
	nip: string;
	regon: string;
	regNoPosition: string;
	website: string;
}

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

export interface InstitutionsResponse {
	items: InstitutionListItem[];
	pageIndex: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
}

export interface LocationResponse {
	institutionType: InstitutionType;
	regNo: string;
	name: string;
	longitude: number;
	latitude: number;
}