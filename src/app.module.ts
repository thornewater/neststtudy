import { Module } from '@nestjs/common';
import 'dotenv/config';
import { ConfigModule } from '@nestjs/config';
import { DataSourceModule } from './data-source/data-source.module';
import { UserModule } from './user-data-souerc/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DataSourceModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
