import { Module } from '@nestjs/common';
import { AppController } from '../api/controllers/AppController';
import { AppService } from '../../adapters/services/AppService';
import { DatabaseConnectionModule } from './database/DatabaseConnectionModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CustomerRepository,
  LoadDimensionsRepository,
  PositionQuotationRepository,
  TransportRepository,
  UserRepository,
} from '../database/repositories/exports.repositories';
import { PositionQuotationModule } from './apis/PositionQuotationModule';
import { AuthenticationModule } from './authentication/AuthenticationModule';

@Module({
  imports: [
    DatabaseConnectionModule,
    TypeOrmModule.forFeature([
      CustomerRepository,
      LoadDimensionsRepository,
      PositionQuotationRepository,
      TransportRepository,
      UserRepository,
    ]),

    PositionQuotationModule,
    AuthenticationModule,

  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {
}


