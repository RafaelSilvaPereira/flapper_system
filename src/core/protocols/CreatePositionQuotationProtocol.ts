import { PositionQuotationModel } from '../models/PositionQuotationModel';
import { BaseDatabaseModel } from '../models/BaseDatabaseModel';

export abstract class CreatePositionQuotationProtocol {
  public abstract call(positionQuotationModel: PositionQuotationModel): Promise<BaseDatabaseModel>;
}
