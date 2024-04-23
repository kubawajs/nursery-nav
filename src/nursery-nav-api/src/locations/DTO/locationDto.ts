import { ApiProperty } from "@nestjs/swagger";

export class LocationDto {
    @ApiProperty()
    regNo: string;

    @ApiProperty()
    longitude: number;

    @ApiProperty()
    latitude: number;
}