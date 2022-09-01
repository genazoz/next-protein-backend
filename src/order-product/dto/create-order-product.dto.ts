import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderProductDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  price: number;

  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  orderId: number;

  category: number;
}
