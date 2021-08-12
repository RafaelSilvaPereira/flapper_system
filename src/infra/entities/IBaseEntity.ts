import { Column, Entity, PrimaryColumn } from 'typeorm';


export abstract class IBaseEntity {

  @PrimaryColumn({name: 'id', nullable: false})
  readonly id: string;

  @Column({name: 'password', nullable: false})
  readonly password: string;

  @Column({name: 'username', nullable: false})
  readonly username: string;

  protected constructor(baseEntity: Required<IBaseEntity>) {
    Object.assign(this, baseEntity);
  }

}
