import { MongooseModule } from "@nestjs/mongoose";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { Institution, InstitutionSchema } from "../shared/schemas/institution.schema";
import { LocationsMongoDbService } from "./locations.mongodb.service";
import { LocationsController } from "./locations.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Institution.name, schema: InstitutionSchema }]),
        CacheModule.register({
            ttl: Number(process.env.CACHE_TTL)
        }),
    ],
    controllers: [LocationsController],
    providers: [LocationsMongoDbService]
})

export class LocationModule { }