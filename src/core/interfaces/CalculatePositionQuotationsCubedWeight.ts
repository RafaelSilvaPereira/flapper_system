import { PositionQuotationModel } from '../models/PositionQuotationModel';

export abstract class CalculatePositionQuotationsCubedWeight {
  abstract call(...positionQuotations: PositionQuotationModel[]): Promise<PositionQuotationModel[]>
}
