import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from 'src/decorators/roles.decorator';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const mail = context.switchToHttp().getRequest().user.mail;
    const user = await this.authService.findUserByEmail(mail);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
