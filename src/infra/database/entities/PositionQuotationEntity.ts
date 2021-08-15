import { IBaseEntity } from './IBaseEntity';
import { CustomerEntity } from './CustomerEntity';
import { LoadDimensionsEntity } from './LoadDimensionsEntity';
import { TransportEntity } from './TransportEntity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { EntityBuilderType } from '../../utils/EntityBuilderType';

@Entity({name: 'position_quotation'})
export class PositionQuotationEntity extends IBaseEntity {

  @OneToOne(
    type => CustomerEntity,
    {
      eager: true,
    },
  )
  @JoinColumn({name: 'fk_customer'})
  readonly customer: CustomerEntity;

  @OneToOne(
    type => LoadDimensionsEntity,
    {
      eager: true,
    },
  )
  @JoinColumn({name: 'fk_load'})
  readonly load: LoadDimensionsEntity;

  @OneToOne(
    type => TransportEntity,
    {
      eager: true,
    },
  )
  @JoinColumn({name: 'fk_transport'})
  readonly transport: TransportEntity;


  constructor(builder: EntityBuilderType<PositionQuotationEntity>) {
    super(builder?.generalData);
    Object.assign(this, builder?.data);
  }

}
