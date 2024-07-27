import { MongooseModule } from "@nestjs/mongoose";
import { City, CitySchema } from "../shared/schemas/city.schema";
import { CitiesController } from "./cities.controller";
import { CitiesMongoDbService } from "./cities.mongodb.service";
import { ICitiesService } from "./icities.service";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
        CacheModule.register({
            ttl: Number(process.env.CACHE_TTL)
        }),
    ],
    controllers: [CitiesController],
    providers: [
        {
            provide: ICitiesService,
            useClass: CitiesMongoDbService
        }
    ]
})

export class CitiesModule { }