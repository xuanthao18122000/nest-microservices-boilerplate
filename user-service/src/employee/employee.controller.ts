import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { EmployeesService } from './employee.service';
import { ApiTags } from '@nestjs/swagger';
import { SendResponse } from 'src/common/response/send-response';
import { CreateEmployeeDto, ListEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';

@Controller('employees')
@ApiTags('Employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async getAllEmployees(@Query() query: ListEmployeeDto) {
    const employees = await this.employeesService.getAll(query);
    return SendResponse.success(employees, 'Get all employees successful')
  }

  @Get(':id')
  async getOneEmployee(@Param('id') id: number) {
    const employee = await this.employeesService.getOne(id);
    return SendResponse.success(employee, 'Get detail employee successful')
  }

  @Post()
  async createemployee(@Body() body: CreateEmployeeDto) {
    const employee = await this.employeesService.create(body);
    return SendResponse.success([], 'Create employee successful')
  }

  @Put()
  async updateemployee(@Param('id') id: number, @Body() body: UpdateEmployeeDto) {
    const employee = await this.employeesService.update(id, body);
    return SendResponse.success([], 'Update employee successful')
  }
}
