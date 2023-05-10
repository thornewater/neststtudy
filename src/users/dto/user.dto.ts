import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  readonly account: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/)
  password: string;
}

export class SingInDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  readonly account: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/)
  password: string;
}
