import { CreatePositionQuotation } from '../../core/interfaces/CreatePositionQuotation';
import { PositionQuotationModel } from '../../core/models/PositionQuotationModel';
import { Injectable } from '@nestjs/common';
import { GetAllPositionQuotation } from '../../core/interfaces/GetAllPositionQuotation';
import { GetCurrentUserPositionQuotations } from '../../core/interfaces/GetCurrentUserPositionQuotations';
import { CalculatePositionQuotationsCubedWeight } from '../../core/interfaces/CalculatePositionQuotationsCubedWeight';
import { BaseDatabaseModel } from '../../core/models/BaseDatabaseModel';

@Injectable()
export class PositionQuotationService {


  constructor(
    private readonly savePositionQuotation: CreatePositionQuotation,
    private readonly getAllPositionQuotations: GetAllPositionQuotation,
    private readonly getCurrentUserPositionQuotations: GetCurrentUserPositionQuotations,
    private readonly calculatePositionQuotationsCubedWeight: CalculatePositionQuotationsCubedWeight,
  ) {
  }

  async save(model: PositionQuotationModel): Promise<BaseDatabaseModel> {
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
