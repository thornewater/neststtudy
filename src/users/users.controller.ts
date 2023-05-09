import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Get('/:userId')
  async getByUserId(@Param('userId') userId: number) {
    return await this.usersService.getByUserId(userId);
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    await this.usersService.saveUser(user);
    return {
      statusCode: 201,
      statusMsg: 'save success',
    };
  }
}
