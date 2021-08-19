import { IBaseEntity } from './IBaseEntity';
import { EntityBuilderTypeOmitKeys } from '../../utils/EntityBuilderType';
import { Column, Entity, OneToMany } from 'typeorm';
import { PositionQuotationEntity } from './PositionQuotationEntity';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';


@Entity({ name: 'user' })
export class UserEntity extends IBaseEntity {

  @Column({ name: 'username', nullable: false })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  @Column({ name: 'password', nullable: false })
  readonly password: string;

  @OneToMany(
    type => PositionQuotationEntity,
    positionQuotationEntity => positionQuotationEntity.id,
  )
  readonly positionQuotations: PositionQuotationEntity[];

  constructor(builder: EntityBuilderTypeOmitKeys<UserEntity, 'password' | 'positionQuotations'>) {
    super(builder?.generalData);
    Object.assign(this, builder?.data);
  }
}
