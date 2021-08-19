import { CustomerModel } from './CustomerModel';
import { TransportModel } from './TransportModel';
import { LoadDimensionsModel } from './LoadDimensionsModel';
import { RequiredAllOrOmitKeys } from '../types/ConstructorsBuildingTypes';

export class PositionQuotationModel {
  readonly id?: string;
  createdById?: string;
  readonly customer: CustomerModel;
  readonly transport: TransportModel;
  cubedWeight?: number;
  readonly load: LoadDimensionsModel;


  constructor(builder: RequiredAllOrOmitKeys<PositionQuotationModel, 'id' | 'createdById' | 'cubedWeight'>) {
    Object.assign(this, builder);
  }
}
