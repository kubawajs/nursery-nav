import { ApiProperty } from "@nestjs/swagger";

export class AddressDto {
    @ApiProperty()
    voivodeship: string;

    @ApiProperty()
    county: string;

    @ApiProperty()
    community: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    street: string;

    @ApiProperty()
    houseNumber: string;

    @ApiProperty()
    localNumber: string;
}
