import { Module } from '@nestjs/common';
import 'dotenv/config';
import { DataSourceModule } from './data-source/data-source.module';
import { UserModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DataSourceModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
