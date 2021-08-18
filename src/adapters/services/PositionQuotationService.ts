import { SavePositionQuotation } from '../../core/interfaces/SavePositionQuotation';
import { PositionQuotationModel } from '../../core/models/PositionQuotationModel';
import { Injectable } from '@nestjs/common';
import { GetAllPositionQuotations } from '../../core/interfaces/GetAllPositionQuotations';
import { GetCurrentUserPositionQuotations } from '../../core/interfaces/GetCurrentUserPositionQuotations';
import { CalculatePositionQuotationsCubedWeight } from '../../core/interfaces/CalculatePositionQuotationsCubedWeight';

@Injectable()
export class PositionQuotationService {


  constructor(
    private readonly savePositionQuotation: SavePositionQuotation,
    private readonly getAllPositionQuotations: GetAllPositionQuotations,
    private readonly getCurrentUserPositionQuotations: GetCurrentUserPositionQuotations,
    private readonly calculatePositionQuotationsCubedWeight: CalculatePositionQuotationsCubedWeight
  ) {
  }

  async save(model: PositionQuotationModel): Promise<PositionQuotationModel> {
    return this.savePositionQuotation.call(model);
  }


  async getAll(): Promise<PositionQuotationModel[]> {
    const positionQuotationModels = await this.getAllPositionQuotations.call();
    return this.calculatePositionQuotationsCubedWeight.call(...positionQuotationModels);
  }


  async getMyPositionQuotations(currentId: string): Promise<PositionQuotationModel[]> {
    const positionQuotationModels = await this.getCurrentUserPositionQuotations.call(currentId);

    return this.calculatePositionQuotationsCubedWeight.call(...positionQuotationModels);
  }
}
