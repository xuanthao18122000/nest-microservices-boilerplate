import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { SendResponse } from 'src/common/response/send-response';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const data = await this.authService.login(body);
    return SendResponse.success(data, 'Login user successful!');
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const data = await this.authService.register(body);
    return SendResponse.success([], 'Register user successful!');
  }

  @Post('logout')
  async logout() {
    const data = this.authService.logout();
    return SendResponse.success([], 'Logout user successful!');
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body) {
    const data = this.authService.forgotPassword(body);
    return SendResponse.success([], 'Send email for user successful!');
  }

  @Post('change-password')
  async changePassword(@Body() body) {
    return this.authService.changPassword(body);
  }

  @Get('profile')
  async getProfile() {
    return this.authService.getProfile();
  }

  @Put('profile')
  async updateProfile(@Body() body) {
    return this.authService.updateProfile(body);
  }
}
