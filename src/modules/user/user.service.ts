import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async get_user_info(id) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    delete user.password;
    return user;
  }
}
