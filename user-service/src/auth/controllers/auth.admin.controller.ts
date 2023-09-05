import {
  Body,
  Controller,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { SendResponse } from 'src/common/response/send-response';
import { GetEmployee, GetUser } from 'src/common/decorators/get-user.decorator';
import { Employee, User } from 'src/database/schema';
import { AuthAdminService } from '../services/auth.admin.service';

@Controller('admin/auth')
@ApiTags('[ADMIN] Auth')
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const data = await this.authAdminService.login(body);
    return SendResponse.success(data, 'Login user successful!');
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const data = await this.authAdminService.register(body);
    return SendResponse.success([], 'Register user successful!');
  }

  @Post('logout')
  async logout() {
    const data = await this.authAdminService.logout();
    return SendResponse.success([], 'Logout user successful!');
  }

  @Post('change-password')
  async changePassword(@Body() body) {
    return await this.authAdminService.changPassword(body);
  }

  @Get('profile')
  @ApiBasicAuth()
  async getProfile(@GetEmployee() employee: Employee) {
    const profile = await this.authAdminService.getProfile(employee?.id);
    return SendResponse.success(profile, 'Get profile successful!');
  }

  @Put('profile')
  async updateProfile(@Body() body) {
    return this.authAdminService.updateProfile(body);
  }
}
