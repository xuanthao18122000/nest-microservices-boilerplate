import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStoreDto } from '../dto/store/create-store.dto';
import { StoreResponseDto } from '../dto/store/store-response.dto';
import { ListStoreDto } from '../dto/store/list-store.dto';
import { UpdateStoreDto } from '../dto/store/update-store.dto';
import { StoreService } from '../services/store.service';

@ApiBearerAuth()
@ApiTags('Stores')
@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('statistics')
  @ApiOperation({ summary: 'Thống kê cửa hàng' })
  getStatistics() {
    return this.storeService.getStatistics();
  }

  @Post()
  @ApiOperation({ summary: 'Tạo cửa hàng' })
  create(@Body() createStoreDto: CreateStoreDto): Promise<StoreResponseDto> {
    return this.storeService.createStore(createStoreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Danh sách cửa hàng' })
  getAll(@Query() listStoreDto: ListStoreDto) {
    return this.storeService.getAllStores(listStoreDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết cửa hàng' })
  get(@Param('id') id: number): Promise<StoreResponseDto> {
    return this.storeService.getStoreById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật cửa hàng' })
  update(
    @Param('id') id: number,
    @Body() updateStoreDto: UpdateStoreDto,
  ): Promise<StoreResponseDto> {
    return this.storeService.updateStore(id, updateStoreDto);
  }
}
