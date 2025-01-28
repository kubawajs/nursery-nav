import { MongooseModule } from "@nestjs/mongoose";
import { City, CitySchema } from "../shared/schemas/city.schema";
import { CitiesController } from "./cities.controller";
import { CitiesMongoDbService } from "./cities.mongodb.service";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
        CacheModule.register({
            isGlobal: true,
            ttl: Number(process.env.CACHE_TTL),
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const store = await redisStore({
                    url: configService.get<string>('REDIS_URL'),
                });
                return {
                    store: () => store,
                };
            }
        }),
    ],
    controllers: [CitiesController],
    providers: [CitiesMongoDbService]
})

export class CitiesModule { }