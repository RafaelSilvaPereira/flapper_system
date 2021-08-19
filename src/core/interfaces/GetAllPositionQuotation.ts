import { PositionQuotationModel } from '../models/PositionQuotationModel';

export abstract class GetAllPositionQuotation {
  abstract call(): Promise<PositionQuotationModel[]>;
}
