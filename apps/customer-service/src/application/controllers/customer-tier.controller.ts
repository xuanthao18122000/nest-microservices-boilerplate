import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCustomerTierDto } from '../dto/customer-tier/create-customer-tier.dto';
import { ListCustomerTierDto } from '../dto/customer-tier/list-customer-tier.dto';
import { CustomerTierResponseDto } from '../dto/customer-tier/customer-response-tier.dto';
import { UpdateCustomerTierDto } from '../dto/customer-tier/update-customer-tier.dto';
import { CustomerTierService } from '../services/customer-tier.service';
import { RequestUser } from '@app/common';
import { User } from 'apps/user-service/src/domain/entities/user.entity';

@ApiBearerAuth()
@ApiTags('Customer Tiers')
@Controller('customer-tiers')
export class CustomerTierController {
  constructor(private readonly customerTierService: CustomerTierService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo loại khách hàng' })
  create(
    @Body() createCustomerTierDto: CreateCustomerTierDto,
    @RequestUser() user: User
  ): Promise<CustomerTierResponseDto> {
    return this.customerTierService.createCustomerTier(createCustomerTierDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Danh sách loại khách hàng' })
  getAll(@Query() listCustomerTierDto: ListCustomerTierDto) {
    return this.customerTierService.getAllCustomerTiers(listCustomerTierDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết loại khách hàng' })
  get(@Param('id') id: number): Promise<CustomerTierResponseDto> {
    return this.customerTierService.getCustomerTierById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật loại khách hàng' })
  update(
    @Param('id') id: number,
    @Body() updateCustomerTierDto: UpdateCustomerTierDto,
  ): Promise<CustomerTierResponseDto> {
    return this.customerTierService.updateCustomerTier(
      id,
      updateCustomerTierDto,
    );
  }
}
