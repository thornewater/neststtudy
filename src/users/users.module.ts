import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersController } from 'src/users/users.controller';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { HttpExceptionFilter } from 'utils/error.filter';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class UserModule {}
