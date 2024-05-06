import { ApiProperty } from "@nestjs/swagger";
import { InstitutionType } from "../../shared/models/institutionType";

export class LocationDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    institutionType: InstitutionType;

    @ApiProperty()
    longitude: number;

    @ApiProperty()
    latitude: number;
}