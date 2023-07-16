import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/requests/auth/login.dto';
import { RegisterDto } from 'src/requests/auth/register.dto';
import * as bcrypt from 'bcrypt';
import { EmailExistsException } from 'src/exceptions/auth/emailExists.exception';
import { InvalidCredentialsException } from 'src/exceptions/auth/invalidCredentials.exceptions';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    const user = await this.authService.findUserByEmail(data.email);
    if (!user) {
      const salt = await bcrypt.genSalt();
      data.password1 = await bcrypt.hash(data.password1, salt);
      return this.authService.register(data);
    } else {
      throw new EmailExistsException();
    }
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    const user = await this.authService.findUserByEmail(data.email);
    if (user) {
      const match = await bcrypt.compare(data.password, user.password);
      if (match) {
        const payload = { id: user.id, mail: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payload);
        return { access_token: token };
      } else {
        throw new InvalidCredentialsException();
      }
    } else {
      throw new InvalidCredentialsException();
    }
  }
}
