import { PositionQuotationModel } from '../models/PositionQuotationModel';

export abstract class GetCurrentUserPositionQuotations {
  abstract call(currentUserId: string): Promise<PositionQuotationModel[]>;
}
