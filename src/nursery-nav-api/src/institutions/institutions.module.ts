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
        ConfigModule,
        CacheModule.register({
            isGlobal: true,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                store: redisStore,
                url: configService.get<string>('REDIS_URL'),
                ttl: configService.get<number>('CACHE_TTL'),
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [InstitutionsController],
    providers: [InstitutionsMongoDbService]
})

export class InstitutionsModule { }