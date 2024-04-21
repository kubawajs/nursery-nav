import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstitutionsController } from './institutions/institutions.controller';
import { InstitutionsService } from './institutions/institutions.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, InstitutionsController],
  providers: [AppService, InstitutionsService],
})
export class AppModule { }
