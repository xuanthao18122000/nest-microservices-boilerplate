import { Injectable } from '@nestjs/common';
import { GetAllRoleUseCase } from './get-all-role.use-case';
import { GetOneRoleUseCase } from './get-one-role.use-case';
import { CreateRoleUseCase } from './create-role.use-case';
import { UpdateRoleUseCase } from './update-role.use-case';
import { CreateRoleDto } from '../../dto/role/create-role.dto';
import { UpdateRoleDto } from '../../dto/role/update-role.dto';
import { ListRoleDto } from '../../dto/role/list-role.dto';
import { CheckExistedKeyRoleUseCase } from './check-existed-key-role.use-case';

@Injectable()
export class RoleUseCase {
  constructor(
    private readonly getAllRoleUseCase: GetAllRoleUseCase,
    private readonly getOneRoleUseCase: GetOneRoleUseCase,
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly checkExistedKeyRoleUseCase: CheckExistedKeyRoleUseCase,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    await this.checkExistedKeyRoleUseCase.execute(createRoleDto.key);
    return this.createRoleUseCase.execute(createRoleDto);
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.getOneRoleUseCase.execute(id);
    return await this.updateRoleUseCase.execute(role, updateRoleDto);
  }

  getRoleById(id: number) {
    return this.getOneRoleUseCase.execute(id);
  }

  getAllRoles(listRoleDto: ListRoleDto) {
    return this.getAllRoleUseCase.execute(listRoleDto);
  }

  async getStatistics() {}
}
