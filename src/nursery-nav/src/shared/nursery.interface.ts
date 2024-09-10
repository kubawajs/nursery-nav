export interface Institution {
	id: number;
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
	id: number;
	institutionType: InstitutionType;
	name: string;
	website: string;
	email: string;
	phone: string;
	basicPricePerHour: number;
	basicPricePerMonth: number;
	isAdaptedToDisabledChildren: boolean;
	isAvailable: boolean;
	city: string;
}

export enum InstitutionType {
	NURSERY = 'NURSERY',
	CHILDCLUB = 'CHILDCLUB'
}

export interface InstitutionAutocomplete {
	name: string;
	id: number;
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
	community: string;
	city: string;
	street: string;
	houseNumber: string;
	localNumber: string;
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
	id: number;
	institutionType: InstitutionType;
	name: string;
	longitude: number;
	latitude: number;
}