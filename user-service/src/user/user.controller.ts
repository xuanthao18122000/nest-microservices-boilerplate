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
    return await this.usersService.getOne(id);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @Put()
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return await this.usersService.update(id, body);
  }
}
