import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getByUserId(userId: number): Promise<User> {
    return await this.usersRepository.getByUserId(userId);
  }

  async saveUser(user: CreateUserDto) {
    const saltRounds = 10;

    const userInfo = await this.usersRepository.getByUserAccount(user.account);

    if (userInfo) {
      throw new HttpException('Duplicate account', HttpStatus.BAD_REQUEST);
    }
    user.password = await bcrypt.hash(user.password, saltRounds);

    await this.usersRepository.saveUser(user);
  }
}
