import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { SendResponse } from 'src/common/response/send-response';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/database/schema';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
@ApiTags('[USER] Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const data = await this.authService.login(body);
    return SendResponse.success(data, 'Login user successful!');
  }

  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() req: Request) {}

  @Get('login/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    const data = await this.authService.googleLogin(req);
    return SendResponse.success(data, 'Get user information from google successful!');
  }

  @Get("login/facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(@Req() req: Request){}

  @Get("login/facebook/redirect")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    const data = await this.authService.facebookLogin(req);
    return SendResponse.success(data, 'Get user information from facebook successful!');
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const data = await this.authService.register(body);
    return SendResponse.success([], 'Register user successful!');
  }

  @Post('logout')
  async logout() {
    const data = await this.authService.logout();
    return SendResponse.success([], 'Logout user successful!');
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body) {
    const data = await this.authService.forgotPassword(body);
    return SendResponse.success([], 'Send email for user successful!');
  }

  @Post('change-password')
  async changePassword(@Body() body) {
    return await this.authService.changPassword(body);
  }

  @Get('profile')
  @ApiBasicAuth()
  async getProfile(@GetUser() user: User) {
    const profile = await this.authService.getProfile(user?.id);
    return SendResponse.success(profile, 'Get profile successful!');
  }

  @Put('profile')
  async updateProfile(@Body() body) {
    return this.authService.updateProfile(body);
  }
}
