import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                store: await redisStore({
                    url: configService.get<string>('REDIS_URL'),
                    ttl: configService.get<number>('CACHE_TTL'),
                }),
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [CacheModule],
})
export class SharedCacheModule { }