import { Column, Entity } from 'typeorm';
import { IBaseEntity } from './IBaseEntity';
import { EntityBuilderType } from '../types/EntityBuilderType';

@Entity()
export class LoadEntity extends IBaseEntity {

  @Column({name: 'weight', nullable: false})
  readonly weightKG: number;

  @Column({name: 'height', nullable: false})
  readonly heightCM: number;

  @Column({name: 'width', nullable: false})
  readonly widthCM: number;

  @Column({name: 'depth', nullable: false})
  readonly dephtCM: number;


  constructor(builder: EntityBuilderType<LoadEntity>) {
    super(builder.generalData);
    Object.assign(this, builder.data);
  }

}
