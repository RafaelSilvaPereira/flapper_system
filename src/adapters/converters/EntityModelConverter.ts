import { IBaseEntity } from '../../infra/database/entities/IBaseEntity';

export abstract class EntityModelConverter<E extends IBaseEntity,  M> {
  abstract toEntity(model: M): Promise<E>;
  abstract toModel(entity: E): Promise<M>;
}
