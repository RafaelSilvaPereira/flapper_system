import { Module } from '@nestjs/common';
import { PositionQuotationEntityModelConverter } from '../../../adapters/converters/PositionQuotationEntityModelConverter';
import { CustomerEntityModelConverter } from '../../../adapters/converters/CustomerEntityModelConverter';
import { LoadDimensionsEntityModelConverter } from '../../../core/models/LoadDimensionsEntityModelConverter';
import { TransportEntityModelConverter } from '../../../adapters/converters/TransportEntityModelConverter';
import { UserEntityUserCredentialsConverter } from '../../../adapters/converters/UserEntityUserCredentialsConverter';


const providers = [
  CustomerEntityModelConverter,
  LoadDimensionsEntityModelConverter,
  TransportEntityModelConverter,
  UserEntityUserCredentialsConverter,
  PositionQuotationEntityModelConverter,
];

@Module({
  imports: [],
  controllers: [],
  providers: providers,
  exports: providers,
})
export class TypeConvertersModule {

}
