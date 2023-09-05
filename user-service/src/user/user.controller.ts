import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { SendResponse } from 'src/common/response/send-response';
import { CreateUserDto, ListUserDto, UpdateUserDto } from './dto/user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('admin/users')
@ApiTags('[ADMIN] Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'add-user' })
  async addSubscriber(@Payload() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'get-all-user' })
  async getAllSubscriber(message: ListUserDto) {
    return await this.usersService.getAll(message);
  }

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
