import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(readonly usersRepository: UsersRepository) {}

  async getByUserId(userId: number): Promise<User> {
    return await this.usersRepository.getByUserId(userId);
  }

  async saveUser(user: CreateUserDto) {
    user.password = await bcrypt.hash(user.password, 10);

    await this.usersRepository.saveUser(user);
  }
}
