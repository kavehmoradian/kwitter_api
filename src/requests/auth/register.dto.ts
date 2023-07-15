import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Match } from './custom_validation/match.decorator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 15)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password1: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @Match('password1')
  password2: string;
}
