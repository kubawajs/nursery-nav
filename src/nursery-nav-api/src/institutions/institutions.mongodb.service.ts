import { InjectModel } from "@nestjs/mongoose";
import { InstitutionType } from "../shared/models/institutionType";
import PaginatedResult from "../shared/models/paginatedresult";
import { InstitutionAutocompleteDto } from "./DTO/institutionAutocompleteDto";
import { InstitutionDto } from "./DTO/institutionDto";
import { InstitutionListItemDto } from "./DTO/institutionListItemDto";
import { IInstitutionsService } from "./iinstitutions.service";
import { SortParams } from "./params/sortParams";
import { Injectable } from "@nestjs/common";
import { Institution, InstitutionDocument } from "../shared/schemas/institution.schema";
import { Model } from "mongoose";

@Injectable()
export class InstitutionsMongoDbService implements IInstitutionsService {
    constructor(@InjectModel(Institution.name) private institutionModel: Model<InstitutionDocument>) { }

    async findAll(page: number, size: number, sort: SortParams, city?: string, voivodeship?: string, institutionType?: InstitutionType[], priceMin?: number, priceMax?: number): Promise<PaginatedResult<InstitutionListItemDto>> {
        const institutions = this.institutionModel.find().exec();
        return Promise.resolve(institutions as unknown as PaginatedResult<InstitutionListItemDto>);
    }

    async getById(id: number): Promise<InstitutionDto> {
        const institution = await this.institutionModel.findOne({ id: id }).exec();
        return institution as unknown as InstitutionDto;
    }

    async getByIds(ids: number[]): Promise<InstitutionDto[]> {
        const institutions = await this.institutionModel.find({ id: { $in: ids } }).exec();
        return institutions as unknown as InstitutionDto[];
    }

    async getInstitutionsAutocomplete(searchQuery: string): Promise<InstitutionAutocompleteDto[]> {
        const institutions = await this.institutionModel.find({ name: { '$regex': searchQuery, '$options': 'i' } }).exec();
        return institutions as unknown as InstitutionAutocompleteDto[];
    }
}