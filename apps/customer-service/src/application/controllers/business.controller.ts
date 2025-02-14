import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBusinessDto } from '../dto/business/create-business.dto';
import { BusinessResponseDto } from '../dto/business/business-response.dto';
import { ListBusinessDto } from '../dto/business/list-business.dto';
import { UpdateBusinessDto } from '../dto/business/update-business.dto';
import { BusinessService } from '../services/business.service';

@ApiBearerAuth()
@ApiTags('Businesses')
@Controller('businesses')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo khách hàng doanh nghiệp' })
  create(
    @Body() createBusinessDto: CreateBusinessDto,
  ): Promise<BusinessResponseDto> {
    return this.businessService.createBusiness(createBusinessDto);
  }

  @Get()
  @ApiOperation({ summary: 'Danh sách khách hàng doanh nghiệp' })
  getAll(@Query() listBusinessDto: ListBusinessDto) {
    return this.businessService.getAllBusiness(listBusinessDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết khách hàng doanh nghiệp' })
  get(@Param('id') id: number): Promise<BusinessResponseDto> {
    return this.businessService.getBusinessById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật khách hàng doanh nghiệp' })
  update(
    @Param('id') id: number,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ): Promise<BusinessResponseDto> {
    return this.businessService.updateBusiness(id, updateBusinessDto);
  }
}
