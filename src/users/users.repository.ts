import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersRepository {
  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  async getByUserId(userId: number) {
    const result = await this.usersRepository.findOneBy({ id: userId });
    if (!result) {
      throw new HttpException('userId not valid', HttpStatus.BAD_REQUEST);
    }
    return result;
  }
  async getByUserAccount(account: string): Promise<User> {
    return await this.usersRepository.findOneBy({ account: account });
  }

  async saveUser(user: CreateUserDto) {
    await this.usersRepository.save(user);
  }
}
