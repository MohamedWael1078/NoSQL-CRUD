import { Module } from '@nestjs/common';
import { UsersController } from './controllers/Admins/users.controller';
import { UsersService } from './services/Admins/users.service';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './providers/usrers.provider';
import { JwtModule } from '@nestjs/jwt';
import { authSignInController, authSignUpController } from './controllers/Auth/Auth.controller';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [DatabaseModule,JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '4000s' },
  })],
  controllers: [UsersController,authSignInController,authSignUpController],
  providers: [...usersProviders, UsersService, AuthService],
})
export class UsersModule {}
