import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { responsePagination } from '@app/common/response/paginated.response';
import { ListRoleDto } from '../../application/dto/role/list-role.dto';
import { RoleResponseDto } from '../../application/dto/role/role-response.dto';
import { CreateRoleDto } from '../../application/dto/role/create-role.dto';
import { UpdateRoleDto } from '../../application/dto/role/update-role.dto';
import { RoleUseCase } from '../../application/use-cases/role/role.use-case';

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleUseCase: RoleUseCase) {}

  @Get('statistics')
  @ApiOperation({ summary: 'Thống kê chức vụ' })
  async getStatistics() {
    return this.roleUseCase.getStatistics();
  }

  @Post()
  @ApiOperation({ summary: 'Tạo chức vụ' })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
    const role = await this.roleUseCase.createRole(createRoleDto);
    return plainToClass(RoleResponseDto, role);
  }

  @Get()
  @ApiOperation({ summary: 'Danh sách chức vụ' })
  async getAll(@Query() listRoleDto: ListRoleDto) {
    const [roles, total] = await this.roleUseCase.getAllRoles(listRoleDto);
    const list = roles.map((user) => plainToClass(RoleResponseDto, user));
    return responsePagination(list, total, listRoleDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật chức vụ' })
  async update(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    const role = await this.roleUseCase.updateRole(id, updateRoleDto);
    return plainToClass(RoleResponseDto, role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết chức vụ' })
  async get(@Param('id') id: number): Promise<RoleResponseDto> {
    const role = await this.roleUseCase.getRoleById(id);
    return plainToClass(RoleResponseDto, role);
  }
}
