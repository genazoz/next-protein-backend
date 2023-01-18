import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrderEntity } from './order/entities/order.entity';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';
import { OrderProductEntity } from './order-product/entities/order-product.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [UserEntity, ProductEntity, OrderEntity, OrderProductEntity],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    OrderModule,
    OrderProductModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
