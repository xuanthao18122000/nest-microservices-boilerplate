import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { SendResponse } from 'src/common/response/send-response';
import { CreateUserDto, ListUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(@Query() query: ListUserDto) {
    const users = await this.usersService.getAll(query);
    return SendResponse.success(users, 'Get all users successful')
  }

  @Get(':id')
  async getOneUser(@Param('id') id: number) {
    const user = await this.usersService.getOne(id);
    return SendResponse.success(user, 'Get detail user successful')
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body);
    return SendResponse.success([], 'Create user successful')
  }

  @Put()
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    const user = await this.usersService.update(id, body);
    return SendResponse.success([], 'Update user successful')
  }
}
