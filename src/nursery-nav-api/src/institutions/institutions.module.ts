import { MongooseModule } from "@nestjs/mongoose";
import { Institution, InstitutionSchema } from "../shared/schemas/institution.schema";
import { InstitutionsMongoDbService } from "./institutions.mongodb.service";
import { InstitutionsController } from "./institutions.controller";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SharedCacheModule } from "../shared/cache/cache.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Institution.name, schema: InstitutionSchema }]),
        ConfigModule,
        SharedCacheModule,
    ],
    controllers: [InstitutionsController],
    providers: [InstitutionsMongoDbService]
})

export class InstitutionsModule { }