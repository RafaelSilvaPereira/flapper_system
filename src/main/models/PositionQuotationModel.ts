export class PositionQuotationModel {
  readonly load;
  readonly customer;
  readonly transport;

  constructor(builder: Required<PositionQuotationModel>) {
    Object.assign(this, builder);
  }
}
