import { Injectable, NotFoundException } from '@nestjs/common';
import { SignInDto } from '../../dto/auth/sign-in.dto';
import { IUserRepository } from 'apps/user-service/src/domain/interfaces';
import { UserStatusEnum } from 'apps/user-service/src/domain/enums';
import { JwtService } from '@nestjs/jwt';
import { getEnv } from '@app/common/configs/env.config';
import { bcryptCompareHash } from '@app/common/helpers/hash.helper';
import { UserResponseDto } from '../../dto/user/user-response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: SignInDto) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user || user.status !== UserStatusEnum.ACTIVE) {
        throw new Error('Invalid credentials!');
      }

      const comparePassword = await bcryptCompareHash(password, user.password);

      if (!comparePassword) {
        throw new Error('Invalid credentials!');
      }

      const jwt = await this.signToken(user.id, user.email);

      const updatedUser = await this.userRepository.save(user);

      return {
        user: {
          ...plainToClass(UserResponseDto, updatedUser),
        },
        token: jwt.token,
        expiresIn: jwt.expiresIn,
      };
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Sai email hoặc mật khẩu!');
    }
  }

  async signToken(
    id: number,
    email: string,
  ): Promise<{
    token: string;
    expiresIn: string;
  }> {
    const payload = {
      id: id,
      email,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: getEnv('JWT_EXPIRES_IN'),
      secret: getEnv('JWT_SECRET'),
    });
    return {
      token,
      expiresIn: getEnv('JWT_EXPIRES_IN'),
    };
  }
}
