import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from 'src/modules/user/user.service';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('info')
  info(@Request() req) {
    const userid = req.user.id;
    return this.userService.get_user_info(userid);
  }
}
