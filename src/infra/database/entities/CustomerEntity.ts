import { IBaseEntity } from './IBaseEntity';
import { Column, Entity } from 'typeorm';
import { EntityBuilderType } from '../../utils/EntityBuilderType';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

@Entity({ name: 'customer' })
export class CustomerEntity extends IBaseEntity {

  @Column({ name: 'name', nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Column({ name: 'email', nullable: false })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Column({ name: 'phone', nullable: false })
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  constructor(builder: EntityBuilderType<CustomerEntity>) {
    super(builder?.generalData);
    Object.assign(this, builder?.data);
  }
}
