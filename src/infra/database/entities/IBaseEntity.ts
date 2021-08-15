import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
;


export abstract class IBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  readonly id: string;
  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt: Date;

  protected constructor(baseEntity: Partial<IBaseEntity>) {
    if (baseEntity != null) {
      Object.assign(this, baseEntity);
    }
  }

}
