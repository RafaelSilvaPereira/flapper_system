import { IBaseEntity } from './IBaseEntity';
import { Column, Entity } from 'typeorm';
import { EntityBuilderType } from '../../utils/EntityBuilderType';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'transport' })
export class TransportEntity extends IBaseEntity {

  @Column({ name: 'origin_city', nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly originCity: string;

  @Column({ name: 'destination_city', nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly destinationCity: string;

  constructor(builder: EntityBuilderType<TransportEntity>) {
    super(builder?.generalData);
    Object.assign(this, builder?.data);
  }

}
