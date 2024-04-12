import { ApiProperty } from "@nestjs/swagger";

export class AddressDto {
    @ApiProperty()
    voivodeship: string;

    @ApiProperty()
    county: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    fullAddress: string;

    @ApiProperty()
    pin: {
        latitude: number;
        longitude: number;
    };
}
