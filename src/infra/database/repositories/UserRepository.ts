import { EntityRepository } from 'typeorm';
import { BaseRepository } from './BaseRepository';
import { UserEntity } from '../entities/UserEntity';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
}
