import { EntityRepository, Repository } from 'typeorm';
import { LoadDimensionsEntity } from '../entities/exports.entities';
import { BaseRepository } from './BaseRepository';

@EntityRepository(LoadDimensionsEntity)
export class LoadDimensionsRepository extends BaseRepository<LoadDimensionsEntity> {
}
