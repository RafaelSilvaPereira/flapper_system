import { EntityModelConverter } from './EntityModelConverter';
import { CustomerEntity } from '../../infra/database/entities/CustomerEntity';
import { CustomerModel } from '../../main/models/CustomerModel';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerEntityModelConverter implements EntityModelConverter<CustomerEntity, CustomerModel> {

  async toEntity(model: CustomerModel): Promise<CustomerEntity> {
    const { email, id, name, password, phone, username } = model;
    return new CustomerEntity({
      generalData: {
        id: id,
      },
      data: {
        name: name,
        phone: phone,
        email: email,
        password: password,
        username: username,
      },
    });
  }

  async toModel(entity: CustomerEntity): Promise<CustomerModel> {
    let { email, id, name, password, phone, username } = entity;
    return new CustomerModel({
      name: name,
      id: id,
      email: email,
      username: username,
      phone: phone
    });
  }

}
