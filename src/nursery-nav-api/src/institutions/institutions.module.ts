import { MongooseModule } from "@nestjs/mongoose";
import { Institution, InstitutionSchema } from "../shared/schemas/institution.schema";
import { InstitutionsMongoDbService } from "./institutions.mongodb.service";
import { InstitutionsController } from "./institutions.controller";
import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Institution.name, schema: InstitutionSchema }]),
        CacheModule.register({
            ttl: Number(process.env.CACHE_TTL)
        }),
    ],
    controllers: [InstitutionsController],
    providers: [InstitutionsMongoDbService]
})

export class InstitutionsModule { }