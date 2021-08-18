import { PositionQuotationModel } from '../models/PositionQuotationModel';

export abstract class GetAllPositionQuotations {
  abstract call(): Promise<PositionQuotationModel[]>;
}
