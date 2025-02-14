import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ApiOperation } from '@nestjs/swagger';
import { ListProviderDto } from './dto/list-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { CreateProviderDto } from './dto/create-provider.dto';

@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách nhà cung cấp' })
  getAll(@Query() query: ListProviderDto) {
    return this.providerService.getAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo nhà cung cấp' })
  create(@Body() body: CreateProviderDto) {
    return this.providerService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết nhà cung cấp' })
  getOne(@Param('id') id: string) {
    return this.providerService.getOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật nhà cung cấp' })
  update(@Param('id') id: string, @Body() body: UpdateProviderDto) {
    return this.providerService.update(id, body);
  }
}
