import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import {
  PaginatedResponse,
  responsePagination,
} from '@app/common/response/paginated.response';
import { CreateUserDto } from '../../application/dto/user/create-user.dto';
import { UserResponseDto } from '../../application/dto/user/user-response.dto';
import { ListUserDto } from '../../application/dto/user/list-user.dto';
import { UpdateUserDto } from '../../application/dto/user/update-user.dto';
import { UserUseCase } from '../../application/use-cases/user/user.use-case';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get('statistics')
  @ApiOperation({ summary: 'Thống kê người dùng' })
  getStatistics() {
    return this.userUseCase.getStatistics();
  }

  @Post()
  @ApiOperation({ summary: 'Tạo người dùng' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userUseCase.createUser(createUserDto);
    return plainToClass(UserResponseDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Danh sách người dùng' })
  async getAll(
    @Query() listUserDto: ListUserDto,
  ): Promise<PaginatedResponse<UserResponseDto>> {
    const [users, total] = await this.userUseCase.getAllUsers(listUserDto);

    const list = users.map((user) => plainToClass(UserResponseDto, user));
    return responsePagination(list, total, listUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết người dùng' })
  async get(@Param('id') id: number): Promise<UserResponseDto> {
    const user = await this.userUseCase.getUserById(id);
    return plainToClass(UserResponseDto, user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật người dùng' })
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userUseCase.updateUser(id, updateUserDto);
    return plainToClass(UserResponseDto, user);
  }
}
