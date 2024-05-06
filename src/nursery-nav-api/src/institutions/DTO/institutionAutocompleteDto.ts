import { ApiProperty } from "@nestjs/swagger";

export class InstitutionAutocompleteDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    id: number;
}