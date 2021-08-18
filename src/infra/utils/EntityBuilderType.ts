import { IBaseEntity } from '../database/entities/IBaseEntity';

export type EntityBuilderType<T extends IBaseEntity> = {
  readonly generalData?: Partial<IBaseEntity>;
  readonly data: Required<Omit<T, keyof IBaseEntity>>;
}


