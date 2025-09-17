import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type InstitutionDocument = HydratedDocument<Institution>;

@Schema()
export class OperatingEntity {
    @Prop()
    city: string;

    @Prop()
    street: string;

    @Prop()
    houseNumber: string;

    @Prop()
    localNumber: string;

    @Prop()
    postalCode: string;

    @Prop()
    name: string;

    @Prop()
    nip: string;

    @Prop()
    regNoPosition: string;

    @Prop()
    regon: string;

    @Prop()
    website: string;
}

@Schema()
export class Pin {
    @Prop()
    latitude: number;

    @Prop()
    longitude: number;
}

@Schema()
export class Address {
    @Prop()
    houseNumber: string;

    @Prop()
    localNumber: string;

    @Prop()
    street: string;

    @Prop()
    city: string;

    @Prop()
    community: string;

    @Prop()
    county: string;

    @Prop()
    voivodeship: string;

    @Prop()
    fullAddress: string;

    @Prop()
    pin: Pin;
}

@Schema()
export class Institution {
    @Prop()
    id: number;

    @Prop()
    institutionType: string;

    @Prop()
    name: string;

    @Prop()
    address: Address;

    @Prop()
    website: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop()
    capacity: number;

    @Prop()
    kidsEnrolled: number;

    @Prop()
    basicPricePerMonth: number;

    @Prop()
    basicPricePerHour: number;

    @Prop()
    extendedStayOver10H: number;

    @Prop()
    foodPricePerDay: number;

    @Prop()
    foodPricePerMonth: number;

    @Prop([String])
    discounts: string[];

    @Prop()
    openingHours: string;

    @Prop()
    isAdaptedToDisabledChildren: boolean;

    @Prop()
    businessActivitySuspended: boolean;

    @Prop()
    operatingEntity: OperatingEntity;

    @Prop()
    rating: number;
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);
// Indexes to support filtering and sorting performance
InstitutionSchema.index({ id: 1 }, { unique: true, background: true });
InstitutionSchema.index({ 'address.city': 1 }, { background: true });
InstitutionSchema.index({ 'address.voivodeship': 1 }, { background: true });
InstitutionSchema.index({ name: 1 }, { background: true });
InstitutionSchema.index({ basicPricePerMonth: 1 }, { background: true });