import { Module } from '@nestjs/common';
import { PositionQuotationController } from '../../api/controllers/PositionQuotationController';
import { CreatePositionQuotationProtocol } from '../../../core/protocols/CreatePositionQuotationProtocol';
import { CreatePositionQuotationRepositoryConnector } from '../../../adapters/connectors/CreatePositionQuotationRepositoryConnector';
import { CreatePositionQuotation } from '../../../core/interfaces/CreatePositionQuotation';
import { CreatePositionQuotationUsecase } from '../../../core/usecases/CreatePositionQuotationUsecase';
import { CalculateCubedWeight } from '../../../core/interfaces/CalculateCubedWeight';
import { CalculateCubedWeightUsecase } from '../../../core/usecases/CalculateCubedWeightUsecase';
import { TypeConvertersModule } from '../features/TypeConvertersModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '../../database/repositories/CustomerRepository';
import { LoadDimensionsRepository } from '../../database/repositories/LoadDimensionsRepository';
import { PositionQuotationRepository } from '../../database/repositories/PositionQuotationRepository';
import { TransportRepository } from '../../database/repositories/TransportRepository';
import { PositionQuotationService } from '../../../adapters/services/PositionQuotationService';
import { UserRepository } from '../../database/repositories/UserRepository';
import { GetAllPositionQuotation } from '../../../core/interfaces/GetAllPositionQuotation';
import { GetAllPositionQuotationUsecase } from '../../../core/usecases/GetAllPositionQuotationUsecase';
import { GetAllPositionQuotationProtocol } from '../../../core/protocols/GetAllPositionQuotationProtocol';
import { GetAllPositionQuotationRepositoryConnector } from '../../../adapters/connectors/GetAllPositionQuotationRepositoryConnector';
import { GetCurrentUserPositionQuotations } from '../../../core/interfaces/GetCurrentUserPositionQuotations';
import { GetCurrentUserPositionQuotationsProtocol } from '../../../core/protocols/GetCurrentUserPositionQuotationsProtocol';
import { GetCurrentUserPositionQuotationsRepositoryConnector } from '../../../adapters/connectors/GetCurrentUserPositionQuotationsRepositoryConnector';
import { GetCurrentUserPositionQuotationsUsecase } from '../../../core/usecases/GetCurrentUserPositionQuotationsUsecase';
import { CalculatePositionQuotationsCubedWeight } from '../../../core/interfaces/CalculatePositionQuotationsCubedWeight';
import { CalculatePositionQuotationsCubedWeightUsecase } from '../../../core/usecases/CalculatePositionQuotationsCubedWeightUsecase';

const providers = [
  PositionQuotationService,
  {
    provide: CreatePositionQuotationProtocol,
    useClass: CreatePositionQuotationRepositoryConnector,
  },
  {
    provide: CreatePositionQuotation,
    useClass: CreatePositionQuotationUsecase,
  },
  {
    provide: CalculateCubedWeight,
    useClass: CalculateCubedWeightUsecase,
  },
  {
    provide: CalculatePositionQuotationsCubedWeight,
    useClass: CalculatePositionQuotationsCubedWeightUsecase,
  },
  {
    provide: GetAllPositionQuotation,
    useClass: GetAllPositionQuotationUsecase,
  },
  {
    provide: GetAllPositionQuotationProtocol,
    useClass: GetAllPositionQuotationRepositoryConnector,
  },
  {
    provide: GetCurrentUserPositionQuotations,
    useClass: GetCurrentUserPositionQuotationsUsecase,
  },
  {
    provide: GetCurrentUserPositionQuotationsProtocol,
    useClass: GetCurrentUserPositionQuotationsRepositoryConnector,
  },
];


@Module({
  imports: [
    TypeConvertersModule,
    TypeOrmModule.forFeature([
      CustomerRepository,
      LoadDimensionsRepository,
      PositionQuotationRepository,
      TransportRepository,
      UserRepository,
    ]),
  ],
  controllers: [
    PositionQuotationController,
  ],
  providers: [
    ...providers,
  ],
  exports: [
    ...providers,
  ],
})
export class PositionQuotationModule {

}


