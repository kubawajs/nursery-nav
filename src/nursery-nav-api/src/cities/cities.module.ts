import { MongooseModule } from "@nestjs/mongoose";
import { City, CitySchema } from "../shared/schemas/city.schema";
import { CitiesController } from "./cities.controller";
import { CitiesMongoDbService } from "./cities.mongodb.service";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SharedCacheModule } from "../shared/cache/cache.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
        ConfigModule,
        SharedCacheModule,
    ],
    controllers: [CitiesController],
    providers: [CitiesMongoDbService]
})

export class CitiesModule { }