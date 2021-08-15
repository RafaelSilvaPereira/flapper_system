import { Module } from '@nestjs/common';
import { SavePositionQuotationEntityModelConverter } from '../../../adapters/converters/SavePositionQuotationEntityModelConverter';


@Module({
  imports: [
  ],
  controllers: [],
  providers: [
    SavePositionQuotationEntityModelConverter
  ],
})
export class TypeConvertersModule {

}
