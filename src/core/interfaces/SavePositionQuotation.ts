import { PositionQuotationModel } from '../models/PositionQuotationModel';

export abstract class SavePositionQuotation {
  public abstract call(positionQuotationModel: PositionQuotationModel): Promise<PositionQuotationModel>;
}
