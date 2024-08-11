import { ApiProperty } from "@nestjs/swagger";
import { InstitutionType } from "../../shared/models/institutionType";

export class LocationDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    institutionType: InstitutionType;

    @ApiProperty()
    longitude: number;

    @ApiProperty()
    latitude: number;
}