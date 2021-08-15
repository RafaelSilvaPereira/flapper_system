import { Module } from '@nestjs/common';
import { PositionQuotationController } from '../../api/controllers/PositionQuotationController';
import { PositionQuotationService } from '../../../adapters/services/PositionQuotationService';


@Module({
  controllers: [
    PositionQuotationController,
  ],
  providers: [
    PositionQuotationService,
  ],
})
export class PositionQuotationModule {

}


