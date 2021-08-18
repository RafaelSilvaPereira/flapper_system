import { Module } from '@nestjs/common';
import { PositionQuotationController } from '../../api/controllers/PositionQuotationController';
import { SavePositionQuotationProtocol } from '../../../core/protocols/SavePositionQuotationProtocol';
import { SavePositionQuotationRepositoryConnector } from '../../../adapters/connectors/SavePositionQuotationRepositoryConnector';
import { SavePositionQuotation } from '../../../core/interfaces/SavePositionQuotation';
import { SavePositionQuotationUsecase } from '../../../core/usecases/SavePositionQuotationUsecase';
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
import { GetAllPositionQuotations } from '../../../core/interfaces/GetAllPositionQuotations';
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
    provide: SavePositionQuotationProtocol,
    useClass: SavePositionQuotationRepositoryConnector,
  },
  {
    provide: SavePositionQuotation,
    useClass: SavePositionQuotationUsecase,
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
    provide: GetAllPositionQuotations,
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


