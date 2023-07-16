import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: 'top_secret',
      signOptions: { expiresIn: '60d' },
    }),
    UserModule,
  ],
  controllers: [AuthController, UserController],
  providers: [],
})
export class AppModule {}
