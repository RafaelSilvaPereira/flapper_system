import { SavePositionQuotation } from '../interfaces/SavePositionQuotation';
import { PositionQuotationModel } from '../models/PositionQuotationModel';
import { SavePositionQuotationProtocol } from '../protocols/SavePositionQuotationProtocol';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SavePositionQuotationUsecase implements SavePositionQuotation {

  constructor(
    private readonly savePositionQuotationProtocol: SavePositionQuotationProtocol
  ) {
  }

  public call(positionQuotationModel: PositionQuotationModel): Promise<PositionQuotationModel> {
    return this.savePositionQuotationProtocol.call(positionQuotationModel);
  }

}
