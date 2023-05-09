import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly account: string;
  @IsString()
  password: string;
}
