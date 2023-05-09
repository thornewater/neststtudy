import { Module } from '@nestjs/common';
import 'dotenv/config';
import { ConfigModule } from '@nestjs/config';
import { DataSourceModule } from './data-source/data-source.module';
import { UserModule } from './user-data-souerc/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'utils/error.filter';

@Module({
  imports: [DataSourceModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
