import { ApiProperty } from "@nestjs/swagger";
import { InstitutionType } from "../../shared/models/institutionType";

export class InstitutionListItemDto {
    @ApiProperty()
    id: number;

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
    basicPricePerMonth: number;

    @ApiProperty()
    isAdaptedToDisabledChildren: boolean;

    @ApiProperty()
    city: string;
}