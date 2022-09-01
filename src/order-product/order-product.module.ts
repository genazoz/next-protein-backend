import { Module } from '@nestjs/common';
import { OrderProductService, OrderProductService } from "./order-product.service";
import { ProductController } from './order-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/order-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProductEntity])],
  controllers: [OrderProductController],
  providers: [OrderProductService],
  exports: [OrderProductService],
})
export class ProductModule {}
