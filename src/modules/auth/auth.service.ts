import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from 'src/requests/auth/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(data: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password1,
        name: data.username,
      },
      select: {
        id: true,
        email: true,
        name: true,
        created_at: true,
        role: true,
      },
    });
    return user;
  }

  async findUserByEmail(email) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  }

  login() {}
}
