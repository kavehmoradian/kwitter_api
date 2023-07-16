import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
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

  @Get('admin')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  admin(@Request() req) {
    const userid = req.user.id;
    return this.userService.get_user_info(userid);
  }
}
