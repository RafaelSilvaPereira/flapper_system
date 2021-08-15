import { TypeOrmModule } from "@nestjs/typeorm";
import {
  CustomerEntity,
  LoadDimensionsEntity,
  PositionQuotationEntity,
  TransportEntity,
} from '../../database/entities/exports.entities';

export const ConnectionConfiguration = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'dev',
  password: 'dev',
  database: 'flapper_system',
  insecureAuth: true,
  entities: [CustomerEntity, LoadDimensionsEntity, PositionQuotationEntity, TransportEntity],
  synchronize: false,
});
