export class CustomerModel {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly password?: string;
  readonly username: string;

  constructor(builder: (Required<Omit<CustomerModel, 'password'>> | Required<CustomerModel>)) {
    Object.assign(this, builder);
  }
}
