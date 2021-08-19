import { CreatePositionQuotation } from '../interfaces/CreatePositionQuotation';
import { PositionQuotationModel } from '../models/PositionQuotationModel';
import { CreatePositionQuotationProtocol } from '../protocols/CreatePositionQuotationProtocol';
import { Injectable } from '@nestjs/common';
import { BaseDatabaseModel } from '../models/BaseDatabaseModel';

@Injectable()
export class CreatePositionQuotationUsecase implements CreatePositionQuotation {

  constructor(
    private readonly savePositionQuotationProtocol: CreatePositionQuotationProtocol,
  ) {
  }

  public call(positionQuotationModel: PositionQuotationModel): Promise<BaseDatabaseModel> {
    return this.savePositionQuotationProtocol.call(positionQuotationModel);
  }

}
