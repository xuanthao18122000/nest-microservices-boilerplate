import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { Employee, User } from 'src/database/schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { AuthAdminController } from './controllers/auth.admin.controller';
import { AuthAdminService } from './services/auth.admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Employee]),
    PassportModule.register({ defaultStrategy: 'google' })
  ],
  controllers: [AuthController, AuthAdminController],
  providers: [AuthService,AuthAdminService, JwtService, GoogleStrategy, FacebookStrategy],
})
export class AuthModule {}
