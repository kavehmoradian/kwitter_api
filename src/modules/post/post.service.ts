import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async compose(data, user) {
    const post = await this.prismaService.post.create({
      data: {
        published: true,
        title: data.title,
        content: data.content,
        author: { connect: { id: user.id } },
      },
    });
    return post;
  }

  async all() {
    const posts = await this.prismaService.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
    return posts;
  }
}
