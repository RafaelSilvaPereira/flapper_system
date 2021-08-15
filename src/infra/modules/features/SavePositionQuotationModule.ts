import { Module } from '@nestjs/common';
import { SavePositionQuotation } from '../../../main/interfaces/SavePositionQuotation';
import { SavePositionQuotationUsecase } from '../../../main/usecases/SavePositionQuotationUsecase';
import { SavePositionQuotationProtocol } from '../../../main/protocols/SavePositionQuotationProtocol';
import { SavePositionQuotationConnector } from '../../../adapters/connectors/SavePositionQuotationConnector';


@Module({
  imports: [
  ],
  controllers: [],
  providers: [
    {
      provide: SavePositionQuotation,
      useClass: SavePositionQuotationUsecase
    },
    {
      provide: SavePositionQuotationProtocol,
      useClass: SavePositionQuotationConnector
    }
  ],
})
export class SavePositionQuotationModule {

}
