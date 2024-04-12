import { ApiProperty } from "@nestjs/swagger";
import { AddressDto } from "./addressDto";
import { InstitutionType } from "./institutionType";
import { OperatingEntityDto } from "./operatingEntityDto";

export class InstitutionDto {
    @ApiProperty()
    institutionType: InstitutionType;

    @ApiProperty()
    name: string;

    @ApiProperty()
    website: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    capacity: number;

    @ApiProperty()
    kidsEnrolled: number;

    @ApiProperty()
    basicPricePerMonth: number;

    @ApiProperty()
    extendedStayOver10H?: number;

    @ApiProperty()
    basicPricePerHour?: number;

    @ApiProperty()
    foodPricePerMonth?: number;

    @ApiProperty()
    foodPricePerDay?: number;

    @ApiProperty()
    discounts?: string[];

    @ApiProperty()
    openingHours: string;

    @ApiProperty()
    isAdaptedToDisabledChildren: boolean;

    @ApiProperty()
    operatingEntity: OperatingEntityDto;

    @ApiProperty()
    businessActivitySuspended: boolean;

    @ApiProperty()
    address: AddressDto;
}


