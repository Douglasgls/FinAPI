import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './repository/implantation/transactions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './entity/transactions.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transactions]),
    UserModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService,
    {
      provide: 'ITransactionRepository',
      useClass: TransactionsRepository
    }
  ],
})
export class TransactionsModule {}
