import { ApiProperty } from "@nestjs/swagger";

export class OperatingEntityDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    street: string;

    @ApiProperty()
    houseNumber: string;

    @ApiProperty()
    localNumber: string;

    @ApiProperty()
    postalCode: string;

    @ApiProperty()
    nip: string;

    @ApiProperty()
    regon: string;

    @ApiProperty()
    regNoPosition: string;

    @ApiProperty()
    website: string;
}
