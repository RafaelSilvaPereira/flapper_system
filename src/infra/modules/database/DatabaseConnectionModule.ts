import { Module } from '@nestjs/common';
import { ConnectionConfiguration } from './ConnectionConfiguration';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConnectionConfiguration,
  ],
  controllers: [],
  providers: [],
})
export class DatabaseConnectionModule {

}
