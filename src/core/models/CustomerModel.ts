export class CustomerModel {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;


  constructor(builder: Required<CustomerModel>) {
    Object.assign(this, builder);
  }
}
