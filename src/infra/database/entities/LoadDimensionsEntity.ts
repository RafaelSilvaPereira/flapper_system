import { Column, Entity } from 'typeorm';
import { IBaseEntity } from './IBaseEntity';
import { EntityBuilderType } from '../../utils/EntityBuilderType';
import { IsNotEmpty, IsPositive } from 'class-validator';

@Entity({name: 'load_dimensions'})
export class LoadDimensionsEntity extends IBaseEntity {

  @Column({ name: 'weight', nullable: false })
  @IsPositive()
  @IsNotEmpty()
  readonly weightKG: number;

  @Column({ name: 'height', nullable: false })
  @IsPositive()
  @IsNotEmpty()
  readonly heightCM: number;

  @Column({ name: 'width', nullable: false })
  @IsPositive()
  @IsNotEmpty()
  readonly widthCM: number;

  @Column({ name: 'depth', nullable: false })
  @IsPositive()
  @IsNotEmpty()
  readonly dephtCM: number;


  constructor(builder: EntityBuilderType<LoadDimensionsEntity>) {
    super(builder?.generalData);
    Object.assign(this, builder?.data);
  }

}
