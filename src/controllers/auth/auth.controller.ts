import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/requests/auth/login.dto';
import { RegisterDto } from 'src/requests/auth/register.dto';
import * as bcrypt from 'bcrypt';
import { EmailExists } from 'src/exceptions/auth/emailExists.exception';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    const user = await this.authService.findUserByEmail(data.email);

    if (user === 0) {
      const salt = await bcrypt.genSalt();
      data.password1 = await bcrypt.hash(data.password1, salt);
      return this.authService.register(data);
    } else {
      throw new EmailExists();
    }
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    const match = await bcrypt.compare(data.password, '');
    return match;
  }
}
