import { EntityModelConverter } from './EntityModelConverter';
import { CustomerEntity } from '../../infra/database/entities/CustomerEntity';
import { CustomerModel } from '../../core/models/CustomerModel';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerEntityModelConverter implements EntityModelConverter<CustomerEntity, CustomerModel> {

  async toEntity(model: CustomerModel): Promise<CustomerEntity> {
    const { email, id, name, phone } = model;
    return new CustomerEntity({
      generalData: {
        id: id,
      },
      data: {
        name: name,
        phone: phone,
        email: email,
      },
    });
  }

  async toModel(entity: CustomerEntity): Promise<CustomerModel> {
    let { email, id, name, phone } = entity;
    return new CustomerModel({
      name: name,
      id: id,
      email: email,
      phone: phone,
    });
  }

}
