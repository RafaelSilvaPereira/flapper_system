import { Module } from '@nestjs/common';
import { ConnectionConfiguration } from './ConnectionConfiguration';


@Module({
  imports: [
    ConnectionConfiguration,

  ],
  controllers: [],
  providers: [],
})
export class DatabaseConnectionModule {

}
