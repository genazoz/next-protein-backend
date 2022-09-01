import { Controller, Get, Param, Query } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { SearchProductDto } from './dto/search-order-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: OrderProductService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findById(+id);
  }

  @Get()
  index(@Query() dto: SearchOrderProductDto) {
    return this.productService.paginate(dto);
  }
}
