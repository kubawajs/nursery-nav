import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const redisUrl = configService.get<string>('REDIS_URL');
                const ttl = configService.get<number>('CACHE_TTL');

                if (redisUrl) {
                    // Use Redis store when REDIS_URL is present
                    return {
                        store: await redisStore({
                            url: redisUrl,
                            ttl,
                        }),
                        ttl,
                    };
                }

                // Fallback to in-memory cache for development or when REDIS_URL not provided
                return {
                    ttl,
                };
            },
            inject: [ConfigService],
        }),
    ],
    exports: [CacheModule],
})
export class SharedCacheModule { }