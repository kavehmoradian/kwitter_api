import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { PostService } from 'src/modules/post/post.service';
import { PostDto } from 'src/requests/post/post.dto';
import { User } from '@prisma/client';
import AuthUser from 'src/decorators/authUser.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('post')
@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async allPosts() {
    const posts = await this.postService.all();
    return posts;
  }

  @Post('compose')
  async newPost(@Body() data: PostDto, @AuthUser() user: User) {
    const post = await this.postService.compose(data, user);
    return { status: 'ok', post, user };
  }
}
