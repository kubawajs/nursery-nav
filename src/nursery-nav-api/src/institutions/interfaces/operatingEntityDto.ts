import { ApiProperty } from "@nestjs/swagger";

export class OperatingEntityDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    nip: string;

    @ApiProperty()
    regon: string;

    @ApiProperty()
    regNoPosition: string;

    @ApiProperty()
    website: string;
}
