import { IBaseEntity } from './IBaseEntity';
import { CustomerEntity } from './CustomerEntity';
import { LoadDimensionsEntity } from './LoadDimensionsEntity';
import { TransportEntity } from './TransportEntity';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { EntityBuilderType } from '../../utils/EntityBuilderType';
import { UserEntity } from './UserEntity';
import { IsNotEmptyObject } from 'class-validator';

@Entity({name: 'position_quotation'})
export class PositionQuotationEntity extends IBaseEntity {

  @OneToOne(
    type => CustomerEntity,
    {
      eager: true,
    },
  )
  @JoinColumn({name: 'fk_customer'})
  @IsNotEmptyObject()
  readonly customer: CustomerEntity;

  @OneToOne(
    type => LoadDimensionsEntity,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'fk_load_dimension' })
  @IsNotEmptyObject()
  readonly load: LoadDimensionsEntity;

  @OneToOne(
    type => TransportEntity,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'fk_transport' })
  @IsNotEmptyObject()
  readonly transport: TransportEntity;


  @ManyToOne(
    type => UserEntity,
    object => PositionQuotationEntity,
    { eager: true },
  )
  @JoinColumn({ name: 'created_by' })
  @IsNotEmptyObject()
  readonly createdBy: UserEntity;


  constructor(builder: EntityBuilderType<Required<Omit<PositionQuotationEntity, 'createdBy'>>> | EntityBuilderType<PositionQuotationEntity>) {
    super(builder?.generalData);
    Object.assign(this, builder?.data);
  }

}
