import { GetCurrentUserPositionQuotations } from '../interfaces/GetCurrentUserPositionQuotations';
import { PositionQuotationModel } from '../models/PositionQuotationModel';
import { Injectable } from '@nestjs/common';
import { GetCurrentUserPositionQuotationsProtocol } from '../protocols/GetCurrentUserPositionQuotationsProtocol';

@Injectable()
export class GetCurrentUserPositionQuotationsUsecase implements GetCurrentUserPositionQuotations {

  constructor(
    private readonly getCurrentUserPositionQuotationsProtocol: GetCurrentUserPositionQuotationsProtocol,
  ) {
  }

  async call(currentUserId: string): Promise<PositionQuotationModel[]> {
    return this.getCurrentUserPositionQuotationsProtocol.call(currentUserId);
  }

}
