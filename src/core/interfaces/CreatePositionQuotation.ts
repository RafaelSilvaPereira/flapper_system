import { PositionQuotationModel } from '../models/PositionQuotationModel';
import { BaseDatabaseModel } from '../models/BaseDatabaseModel';

export abstract class CreatePositionQuotation {
  public abstract call(positionQuotationModel: PositionQuotationModel): Promise<BaseDatabaseModel>;
}
