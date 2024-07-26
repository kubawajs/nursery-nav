import { MongooseModule } from "@nestjs/mongoose";
import { Institution, InstitutionSchema } from "../shared/schemas/institution.schema";
import { InstitutionsMongoDbService } from "./institutions.mongodb.service";
import { InstitutionsController } from "./institutions.controller";
import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { IInstitutionsService } from "./iinstitutions.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Institution.name, schema: InstitutionSchema }]),
        CacheModule.register({
            ttl: Number(process.env.CACHE_TTL)
        }),
    ],
    controllers: [InstitutionsController],
    providers: [
        {
            provide: IInstitutionsService,
            useClass: InstitutionsMongoDbService
        }
    ]
})

export class InstitutionsModule { }