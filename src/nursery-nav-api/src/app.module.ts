import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstitutionsController } from './institutions/institutions.controller';
import { InstitutionsDocumentService } from './institutions/institutions.document.service';
import { LocationsController } from './locations/locations.controller';
import { CitiesController } from './cities/cities.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CitiesDocumentService } from './cities/cities.document.service';
import { ICitiesService } from './cities/icities.service';
import { IInstitutionsService } from './institutions/iinstitutions.service';
import { ILocationsService } from './locations/ilocations.service';
import { LocationsDocumentService } from './locations/locations.document.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      ttl: Number(process.env.CACHE_TTL)
    }),
    ThrottlerModule.forRoot([{
      ttl: Number(process.env.THROTTLE_TTL),
      limit: Number(process.env.THROTTLE_LIMIT),
    }])
  ],
  controllers: [
    AppController,
    InstitutionsController,
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
      provide: IInstitutionsService,
      useClass: InstitutionsDocumentService
    },
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
