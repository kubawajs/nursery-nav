import { ApiProperty } from "@nestjs/swagger";

export class CityDto {
    @ApiProperty()
    voivodeship: string;

    @ApiProperty()
    county: string;

    @ApiProperty()
    community: string;
    @ApiProperty()
    city: string;
}
