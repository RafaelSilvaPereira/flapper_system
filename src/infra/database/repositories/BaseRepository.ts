import { IBaseEntity } from '../entities/IBaseEntity';
import { DeepPartial, Repository } from 'typeorm';
import { validate } from 'class-validator';


export abstract class BaseRepository<T extends IBaseEntity> extends Repository<T> {

  async validateAndSave(entity: T): Promise<T> {
    await this.validateEntity(entity);

    const checkEntityType = entity as unknown as DeepPartial<T>;
    const savedEntity = await this.save(checkEntityType);

    return savedEntity;
  }


  async validateEntity(entity: T) {

    const validationErrors = await validate(entity);
    for (let validationError of validationErrors) {
      throw validationError;
    }
  }

}
