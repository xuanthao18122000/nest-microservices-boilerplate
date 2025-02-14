import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '@app/common/decorators/user.decorator';
import { User } from '../../domain/entities/user.entity';
import { Public } from '@app/common';
import { SignInDto } from '../../application/dto/auth/sign-in.dto';
import { SignUpDto } from '../../application/dto/auth/sign-up.dto';
import { AuthUseCase } from '../../application/use-cases/auth/auth.use-case';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Public()
  @Post('sign-in')
  @ApiOperation({ summary: 'Đăng nhập' })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authUseCase.signIn(signInDto);
  }

  @Public()
  @Post('sign-up')
  @ApiOperation({ summary: 'Đăng ký' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authUseCase.signUp(signUpDto);
  }

  @Post('sign-out')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đăng xuất' })
  async signOut(@RequestUser() user: User) {
    return await this.authUseCase.signOut(user);
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Thông tin cá nhân' })
  async getProfile(@RequestUser() user: User) {
    return await this.authUseCase.getProfile(user);
  }
}
