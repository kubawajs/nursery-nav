import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { Institution, InstitutionSchema } from "../shared/schemas/institution.schema";
import { LocationsMongoDbService } from "./locations.mongodb.service";
import { LocationsController } from "./locations.controller";
import { ConfigModule } from "@nestjs/config";
import { SharedCacheModule } from "../shared/cache/cache.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Institution.name, schema: InstitutionSchema }]),
        ConfigModule,
        SharedCacheModule,
    ],
    controllers: [LocationsController],
    providers: [LocationsMongoDbService]
})

export class LocationModule { }