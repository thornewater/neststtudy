import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SingInDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RequestWithUser } from './req.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() user: SingInDto) {
    return await this.authService.SignIn(user);
  }
  @Get()
  @UseGuards(AuthGuard)
  async checkAuth(@Req() req: RequestWithUser) {
    const user = req.user;

    return user;
  }
}
