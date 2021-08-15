import { EntityRepository } from 'typeorm';
import { TransportEntity } from '../entities/TransportEntity';
import { BaseRepository } from './BaseRepository';

@EntityRepository(TransportEntity)
export class TransportRepository extends BaseRepository<TransportEntity> {
}
