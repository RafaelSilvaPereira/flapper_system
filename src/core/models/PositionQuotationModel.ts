
import { CustomerModel } from './CustomerModel';
import { TransportModel } from './TransportModel';
import { LoadDimensionsModel } from './LoadDimensionsModel';

export class PositionQuotationModel {
  createdById?: string;
  readonly customer: CustomerModel;
  readonly transport: TransportModel;
  cubedWeight?: number;
  readonly load: LoadDimensionsModel;





  constructor(builder: Required<Omit<PositionQuotationModel, 'cubedWeight'>> | Required<PositionQuotationModel>) {
    Object.assign(this, builder);
  }
}
