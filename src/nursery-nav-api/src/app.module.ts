import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationsController } from './locations/locations.controller';
import { CitiesController } from './cities/cities.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CitiesDocumentService } from './cities/cities.document.service';
import { ICitiesService } from './cities/icities.service';
import { ILocationsService } from './locations/ilocations.service';
import { LocationsDocumentService } from './locations/locations.document.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InstitutionsModule } from './institutions/institutions.module';

import * as mongoose from 'mongoose';

mongoose.set('debug', true);

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      ttl: Number(process.env.CACHE_TTL)
    }),
    MongooseModule.forRoot("mongodb://localhost:27017/NurseryNavDev"),
    InstitutionsModule,
    ThrottlerModule.forRoot([{
      ttl: Number(process.env.THROTTLE_TTL),
      limit: Number(process.env.THROTTLE_LIMIT),
    }])
  ],
  controllers: [
    AppController,
    LocationsController,
    CitiesController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
    {
      provide: ILocationsService,
      useClass: LocationsDocumentService
    },
    {
      provide: ICitiesService,
      useClass: CitiesDocumentService
    }
  ],
})
export class AppModule { }
