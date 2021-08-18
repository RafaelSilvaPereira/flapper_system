import { PositionQuotationModel } from '../models/PositionQuotationModel';

export abstract class SavePositionQuotationProtocol {
  public abstract call(positionQuotationModel: PositionQuotationModel): Promise<PositionQuotationModel>;
}
