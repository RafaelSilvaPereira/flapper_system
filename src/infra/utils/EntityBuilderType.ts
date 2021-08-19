import { IBaseEntity } from '../database/entities/IBaseEntity';

export type EntityBuilderType<T extends IBaseEntity> = {
  readonly generalData?: Partial<IBaseEntity>;
  readonly data: Required<Omit<T, keyof IBaseEntity>> | Required<Partial<Omit<T, keyof IBaseEntity>>>;
}

export type EntityBuilderTypeOmitKeys<T extends IBaseEntity, K extends keyof T> = {
  readonly generalData?: Partial<IBaseEntity>;
  readonly data: Required<Omit<T, keyof IBaseEntity | K>> | Required<Partial<Omit<T, keyof IBaseEntity>>>;
}


