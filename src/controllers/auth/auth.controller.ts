import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/requests/auth/login.dto';
import { RegisterDto } from 'src/requests/auth/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() data: RegisterDto) {
    return data;
  }

  @Post('login')
  login(@Body() data: LoginDto) {}
}
