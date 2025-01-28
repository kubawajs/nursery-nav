import { MongooseModule } from "@nestjs/mongoose";
import { Institution, InstitutionSchema } from "../shared/schemas/institution.schema";
import { InstitutionsMongoDbService } from "./institutions.mongodb.service";
import { InstitutionsController } from "./institutions.controller";
import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
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
    controllers: [InstitutionsController],
    providers: [InstitutionsMongoDbService]
})

export class InstitutionsModule { }