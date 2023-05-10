import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SingInDto } from 'src/users/dto/user.dto';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async SignIn(user: SingInDto) {
    const userInfo: User | undefined =
      await this.usersRepository.getByUserAccount(user.account);

    const passwordCheck: boolean = await bcrypt.compare(
      user.password,
      userInfo.password,
    );

    if (!userInfo || !passwordCheck) {
      throw new HttpException('User Not Valid', HttpStatus.BAD_REQUEST);
    }

    const token: string = this.jwtService.sign({
      id: userInfo.id,
    });
    return {
      accessToken: token,
      userAccount: userInfo.account,
    };
  }
}
