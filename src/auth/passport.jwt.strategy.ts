import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const { id: userId } = payload;
    const userInfo = await this.usersRepository.getByUserId(userId);

    if (!userInfo) {
      throw new HttpException('User Not Valid', HttpStatus.BAD_REQUEST);
    }
    return userInfo;
  }
}
