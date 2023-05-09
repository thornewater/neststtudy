import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    await this.usersService.saveUser(user);
    return {
      statusCode: 201,
      statusMsg: 'save success',
    };
  }
}
