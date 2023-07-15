import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
