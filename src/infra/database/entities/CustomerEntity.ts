import { IBaseEntity } from './IBaseEntity';
import { Column, Entity } from 'typeorm';
import { EntityBuilderType } from '../../utils/EntityBuilderType';

@Entity({ name: 'customer' })
export class CustomerEntity extends IBaseEntity {

  @Column({ name: 'password', nullable: false })
  readonly password: string;

  @Column({ name: 'username', nullable: false })
  readonly username: string;

  @Column({ name: 'name', nullable: false })
  readonly name: string;

  @Column({ name: 'email', nullable: false })
  readonly email: string;

  @Column({ name: 'phone', nullable: false })
  readonly phone: string;

  constructor(builder: EntityBuilderType<CustomerEntity>) {
    super(builder?.generalData);
    Object.assign(this, builder?.data);
  }
}
