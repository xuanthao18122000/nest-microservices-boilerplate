import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { ListUserDto } from '../../dto/user/list-user.dto';
import { StatisticsUserUseCase } from './statistics-user.use-case';
import { GetAllUserUseCase } from './get-all-user.use-case';
import { GetOneUserUseCase } from './get-one-user.use-case';
import { CreateUserUseCase } from './create-user.use-case';
import { UpdateUserUseCase } from './update-user.use-case';
import { CheckExistedEmailUserUseCase } from './check-existed-email-user.use-case';

@Injectable()
export class UserUseCase {
  constructor(
    private readonly statisticsUserUseCase: StatisticsUserUseCase,
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly getOneUserUseCase: GetOneUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly checkExistedEmailUserUseCase: CheckExistedEmailUserUseCase,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    await this.checkExistedEmailUserUseCase.execute(createUserDto.email);
    return await this.createUserUseCase.execute(createUserDto);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.getOneUserUseCase.execute({ where: { id } });
    return await this.updateUserUseCase.execute(user, updateUserDto);
  }

  getUserById(id: number) {
    return this.getOneUserUseCase.execute({
      where: { id },
    });
  }

  getAllUsers(listUserDto: ListUserDto) {
    return this.getAllUserUseCase.execute(listUserDto);
  }

  getStatistics() {
    return this.statisticsUserUseCase.execute();
  }
}
