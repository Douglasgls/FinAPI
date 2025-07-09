import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { categoryRepository } from './repository/implantation/category';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService,
    {
      provide: 'ICategoryRepository',
      useClass: categoryRepository,
    },
  ]
})
export class CategoryModule {}
