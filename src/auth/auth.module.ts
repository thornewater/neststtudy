import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { HttpExceptionFilter } from 'utils/error.filter';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/users/users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport.jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    UsersRepository,
    AuthService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    JwtStrategy,
  ],
})
export class AuthModule {}
