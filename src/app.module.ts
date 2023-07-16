import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';
import { UserController } from './controllers/user/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostModule } from './modules/post/post.module';
import { PostController } from './controllers/post/post.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '60d' },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PostModule,
  ],
  controllers: [AuthController, UserController, PostController],
  providers: [],
})
export class AppModule {}
