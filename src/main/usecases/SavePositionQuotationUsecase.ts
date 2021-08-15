import { SavePositionQuotation } from '../interfaces/SavePositionQuotation';
import { PositionQuotationModel } from '../models/PositionQuotationModel';
import { SavePositionQuotationProtocol } from '../protocols/SavePositionQuotationProtocol';

export class SavePositionQuotationUsecase implements SavePositionQuotation {

  private readonly savePositionQuotationProtocol: SavePositionQuotationProtocol;

  public call(positionQuotationModel: PositionQuotationModel): Promise<PositionQuotationModel> {
    return Promise.resolve(undefined);
  }

}
