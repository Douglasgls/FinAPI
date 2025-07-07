import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ITransactionRepository } from '../transactions/repository/Itransactions';
import { Transactions } from './entity/transactions.entity';
import { randomUUID } from 'crypto';
import { createTransactionDto } from './dto/createTransaction';
import { IUserRepository } from 'src/user/repository/IUserRepository';

@Injectable()
export class TransactionsService {
    constructor(
        @Inject('ITransactionRepository') private readonly transactionRepository: ITransactionRepository,
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    ) {}

    async createTransaction(transaction: createTransactionDto, userId: string): Promise<Transactions> {

        const user = await this.userRepository.findOneByID(userId);

        if (!user) {
            throw new UnauthorizedException()
        }

        const transactionPyload: Transactions = {
            ...transaction,
            createdAt: new Date(),
            id: randomUUID(),
            type: transaction.type.toUpperCase() as 'INCOME' | 'EXPENSE', 
            userId: userId,
            value: Number(transaction.value)
        }; 

        return await this.transactionRepository.create(transactionPyload);
    }
    
}
