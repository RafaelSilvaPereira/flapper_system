import { GetAllPositionQuotation } from '../interfaces/GetAllPositionQuotation';
import { Injectable } from '@nestjs/common';
import { PositionQuotationModel } from '../models/PositionQuotationModel';
import { GetAllPositionQuotationProtocol } from '../protocols/GetAllPositionQuotationProtocol';

@Injectable()
export class GetAllPositionQuotationUsecase implements GetAllPositionQuotation {

  constructor(
    private readonly getAllPositionQuotationProtocol: GetAllPositionQuotationProtocol,
  ) {

  }


  async call(): Promise<PositionQuotationModel[]> {
    return this.getAllPositionQuotationProtocol.call();
  }

}
