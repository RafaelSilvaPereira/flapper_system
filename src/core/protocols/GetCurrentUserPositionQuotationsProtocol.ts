import { PositionQuotationModel } from '../models/PositionQuotationModel';

export abstract class GetCurrentUserPositionQuotationsProtocol {
  abstract call(currentUserId: string): Promise<PositionQuotationModel[]>;
}
