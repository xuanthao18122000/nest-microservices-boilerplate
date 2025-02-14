import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from '../dto/customer/create-customer.dto';
import { CustomerResponseDto } from '../dto/customer/customer-response.dto';
import { UpdateCustomerDto } from '../dto/customer/update-customer.dto';
import { ListCustomerDto } from '../dto/customer/list-customer.dto';
import { CustomerService } from '../services/customer.service';

@ApiBearerAuth()
@ApiTags('Customer')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('statistics')
  @ApiOperation({ summary: 'Thống kê khách hàng' })
  getStatistics() {
    return this.customerService.getStatistics();
  }

  @Post()
  @ApiOperation({ summary: 'Tạo khách hàng' })
  create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerResponseDto> {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Danh sách khách hàng' })
  getAll(@Query() listCustomerDto: ListCustomerDto) {
    return this.customerService.getAllCustomers(listCustomerDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết khách hàng' })
  get(@Param('id') id: number): Promise<CustomerResponseDto> {
    return this.customerService.getCustomerById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật khách hàng' })
  update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerResponseDto> {
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }
}
