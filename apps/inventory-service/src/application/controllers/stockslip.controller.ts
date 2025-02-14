import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StockSlipService } from '../services/stockslip.service';
import { CreateStockSlipDto } from '../dto/stock-slip/create-stock-slip.dto';
import { ListStockSlipDto } from '../dto/stock-slip/list-stock-slip.dto';
import { StockSlipResponseDto } from '../dto/stock-slip/stock-slip-response.dto';
import { UpdateStockSlipDto } from '../dto/stock-slip/update-stock-slip.dto';

@ApiBearerAuth()
@ApiTags('StockSlips')
@Controller('stock-slips')
export class StockSlipController {
  constructor(private readonly stockSlipService: StockSlipService) {}

  @Get('statistics')
  @ApiOperation({ summary: 'Thống kê nhập/xuất kho' })
  getStatistics() {
    return this.stockSlipService.getStatistics();
  }

  @Post()
  @ApiOperation({ summary: 'Tạo nhập/xuất kho' })
  create(
    @Body() createStockSlipDto: CreateStockSlipDto,
  ): Promise<StockSlipResponseDto> {
    return this.stockSlipService.createStockSlip(createStockSlipDto);
  }

  @Get()
  @ApiOperation({ summary: 'Danh sách nhập/xuất kho' })
  getAll(@Query() listStockSlipDto: ListStockSlipDto) {
    return this.stockSlipService.getAllStockSlips(listStockSlipDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết nhập/xuất kho' })
  get(@Param('id') id: number): Promise<StockSlipResponseDto> {
    return this.stockSlipService.getStockSlipById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật nhập/xuất kho' })
  update(
    @Param('id') id: number,
    @Body() updateStockSlipDto: UpdateStockSlipDto,
  ): Promise<StockSlipResponseDto> {
    return this.stockSlipService.updateStockSlip(id, updateStockSlipDto);
  }
}
