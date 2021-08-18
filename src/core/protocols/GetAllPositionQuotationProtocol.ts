import { PositionQuotationModel } from '../models/PositionQuotationModel';

export abstract class GetAllPositionQuotationProtocol {
  abstract call(): Promise<PositionQuotationModel[]>;
}
