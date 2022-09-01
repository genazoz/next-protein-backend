import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { SearchOrderProductDto } from './dto/search-order-product.dto';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProductEntity)
    private repository: Repository<OrderProductEntity>,
  ) {}

  async paginate(dto: SearchOrderProductDto) {
    const qb = this.repository.createQueryBuilder('c');

    if (dto.title) {
      qb.andWhere(`c.title ILIKE :title`);
      qb.setParameters({
        title: `%${dto.title}%`,
      });
    }

    if (dto.categories) {
      const arr = dto.categories.split(',');
      const categories = [...arr.map((item) => parseInt(item))];

      qb.andWhere('c.category IN (:...categories)', { categories });
    }

    const limit = dto.limit;
    const route = 'http://localhost:8888/products';
    const page = dto.page;

    return paginate<OrderProductEntity>(qb, { limit, page, route });
  }

  findById(id: number) {
    return this.repository.findOneBy({ id: id });
  }
}
