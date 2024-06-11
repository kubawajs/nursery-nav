import { InstitutionType } from "../shared/models/institutionType";
import PaginatedResult from "../shared/models/paginatedresult";
import { InstitutionAutocompleteDto } from "./DTO/institutionAutocompleteDto";
import { InstitutionDto } from "./DTO/institutionDto";
import { InstitutionListItemDto } from "./DTO/institutionListItemDto";
import { SortParams } from "./params/sortParams";

export interface IInstitutionsService {
    findAll(page: number, size: number, sort: SortParams, city?: string, voivodeship?: string, institutionType?: InstitutionType[], priceMin?: number, priceMax?: number): Promise<PaginatedResult<InstitutionListItemDto>>;
    getById(id: number): Promise<InstitutionDto>;
    getByIds(ids: number[]): Promise<InstitutionDto[]>;
    getInstitutionsAutocomplete(searchQuery: string): Promise<InstitutionAutocompleteDto[]>;
}
export const IInstitutionsService = Symbol('IInstitutionsService');