import { EntityRepository, Repository } from 'typeorm';
import { PositionQuotationEntity } from '../entities/PositionQuotationEntity';
import { BaseRepository } from './BaseRepository';

@EntityRepository(PositionQuotationEntity)
export class PositionQuotationRepository extends BaseRepository<PositionQuotationEntity> {
}
