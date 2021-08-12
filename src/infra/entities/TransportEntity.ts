import { IBaseEntity } from './IBaseEntity';
import { Column, Entity } from 'typeorm';
import { EntityBuilderType } from '../types/EntityBuilderType';

@Entity()
export class TransportEntity extends IBaseEntity {

  @Column({name: 'origin_city', nullable: false})
  readonly originCity: string;

  @Column({name: 'destination_city', nullable: false})
  readonly destinationCity: string;

  constructor(builder: EntityBuilderType<TransportEntity>) {
    super(builder.generalData);
    Object.assign(this, builder.data);
  }

}
