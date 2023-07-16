import { SetMetadata } from '@nestjs/common';

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

export const ROLES_KEY = 'role';
export const Roles = (...role: Role[]) => SetMetadata(ROLES_KEY, role);
