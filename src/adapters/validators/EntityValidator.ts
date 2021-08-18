import { Injectable } from '@nestjs/common';
import { IBaseEntity } from '../../infra/database/entities/IBaseEntity';
import { validate } from 'class-validator';


@Injectable()
export class EntityValidator {
  async validate<T extends IBaseEntity>(entity: T) {
    const validationErrors = await validate(entity);
    validationErrors.forEach(validationError => {
      throw validationError;
    });
  }
}
