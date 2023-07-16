import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Match } from './custom_validation/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(3, 15)
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(8, 20)
  password1: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @ApiProperty()
  @Match('password1')
  password2: string;
}
