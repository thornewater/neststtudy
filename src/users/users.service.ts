import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
  }

  async getByUserId(userId: number): Promise<User> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async saveUser(user: CreateUserDto) {
    user.password = await bcrypt.hash(user.password, 10);

    await this.userRepository.save(user);
  }
}
