import { ApiProperty } from "@nestjs/swagger";

export default class PaginatedResult<T> {
    @ApiProperty()
    totalItems: number;

    @ApiProperty()
    pageIndex: number;

    @ApiProperty()
    pageSize: number;

    @ApiProperty()
    totalPages: number;

    @ApiProperty()
    ids: string[];

    @ApiProperty()
    items: T[];
}