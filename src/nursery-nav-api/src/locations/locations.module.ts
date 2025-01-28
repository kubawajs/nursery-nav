import { MongooseModule } from "@nestjs/mongoose";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { Institution, InstitutionSchema } from "../shared/schemas/institution.schema";
import { LocationsMongoDbService } from "./locations.mongodb.service";
import { LocationsController } from "./locations.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Institution.name, schema: InstitutionSchema }]),
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
    controllers: [LocationsController],
    providers: [LocationsMongoDbService]
})

export class LocationModule { }