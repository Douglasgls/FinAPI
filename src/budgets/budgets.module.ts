import { Module } from '@nestjs/common';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';
import { BudgetsRepository } from './repository/implantation/budgets.repository';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';
import { budgets } from './entity/budgets.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([budgets]),UserModule, CategoryModule],
  controllers: [BudgetsController],
  providers: [
    BudgetsService,
    { provide: 'IBudgetsRepository', useClass: BudgetsRepository },
  ]
})
export class BudgetsModule {}
