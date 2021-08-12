import { IBaseEntity } from './IBaseEntity';
import { Column, Entity } from 'typeorm';
import { EntityBuilderType } from '../types/EntityBuilderType';

@Entity()
export class CustomerEntity extends IBaseEntity {
  @Column({ name: 'name', nullable: false })
  readonly name: string;

  @Column({ name: 'email', nullable: false })
  readonly email: string;

  @Column({ name: 'phone', nullable: false })
  readonly phone: string;

  constructor(buildObject: EntityBuilderType<CustomerEntity>) {
    super(buildObject.generalData);
    Object.assign(this, buildObject.data);
  }
}
