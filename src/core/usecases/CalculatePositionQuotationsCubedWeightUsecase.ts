import { CalculatePositionQuotationsCubedWeight } from '../interfaces/CalculatePositionQuotationsCubedWeight';
import { Injectable } from '@nestjs/common';
import { PositionQuotationModel } from '../models/PositionQuotationModel';
import { CalculateCubedWeight } from '../interfaces/CalculateCubedWeight';

@Injectable()
export class CalculatePositionQuotationsCubedWeightUsecase implements CalculatePositionQuotationsCubedWeight {

  constructor(
    private readonly calculatedCubedWeight: CalculateCubedWeight,
  ) {

  }


  async call(...positionQuotations: PositionQuotationModel[]): Promise<PositionQuotationModel[]> {
    return await Promise.all(positionQuotations.map(async (model) => {
      model.cubedWeight = (await this.calculatedCubedWeight.calculate(model.load)).value;
      return model;
    }));
  }

}
