import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstitutionsController } from './institutions/institutions.controller';
import { InstitutionsService } from './institutions/institutions.service';
import { LocationsController } from './locations/locations.controller';
import { LocationsService } from './locations/locations.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, InstitutionsController, LocationsController],
  providers: [AppService, InstitutionsService, LocationsService],
})
export class AppModule { }
