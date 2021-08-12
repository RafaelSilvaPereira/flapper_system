import { IBaseEntity } from '../entities/IBaseEntity';

export type EntityBuilderType<T extends IBaseEntity> = {
  readonly generalData?: Required<IBaseEntity>;
  readonly data: Required<T>;
}
