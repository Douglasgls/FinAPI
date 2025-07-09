import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ITransactionRepository } from '../transactions/repository/Itransactions';
import { Transactions } from './entity/transactions.entity';
import { randomUUID } from 'crypto';
import { createTransactionDto } from './dto/createTransaction';
import { IUserRepository } from 'src/user/repository/IUserRepository';
import { updateTransactionDto } from './dto/updateTransaction';
import { omit } from 'lodash';

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
            value: Number(transaction.value),
            description: transaction.description.toUpperCase(),
            category: transaction.category.toUpperCase(),
            user: user,
        }; 

        const createdTransaction = await this.transactionRepository.create(transactionPyload);

        return omit(createdTransaction, ['user']);
    }

    async updatePartialTransaction(userId: string, transactionId: string, transaction: updateTransactionDto): Promise<Transactions> {
        const user = await this.userRepository.findOneByID(userId);

        if (!user) {
            throw new UnauthorizedException(
                'User not found. Please provide a valid user ID.',
            );
        }
        const existingTransaction = await this.transactionRepository.findOneByID(transactionId);
        if (!existingTransaction) {
            throw new UnauthorizedException(
                'Transaction not found. Please provide a valid transaction ID.',
            );
        }
        if (existingTransaction.userId !== userId) {
            throw new UnauthorizedException(
                'You do not have permission to update this transaction.',
            );
        }

        if (transaction.type) {
            transaction.type = transaction.type.toUpperCase() as 'INCOME' | 'EXPENSE';
        }

        transaction.category = transaction.category?.toUpperCase();
        transaction.description = transaction.description?.toUpperCase();

        const updatedTransaction = await this.transactionRepository.update(transactionId, {
            ...existingTransaction,
            ...transaction,
        });

        if (!updatedTransaction) {
            throw new UnauthorizedException(
                'Failed to update transaction. Please try again.',
            );
        }

        return omit(updatedTransaction, ['user']);
    }

    async deleteTransaction(userId: string, transactionId: string): Promise<void> {
        const user = await this.userRepository.findOneByID(userId);
        
        if (!user) {
            throw new UnauthorizedException(
                'User not found. Please provide a valid user ID.',
            );
        }

        const transaction = await this.transactionRepository.findOneByID(transactionId);
        if (!transaction) {
            throw new UnauthorizedException(
                'Transaction not found. Please provide a valid transaction ID.',
            );
        }
        if (transaction.userId !== userId) {
            throw new UnauthorizedException(
                'You do not have permission to delete this transaction.',
            );
        }
        const deleted = await this.transactionRepository.delete(transactionId);

        if (!deleted) {
            throw new UnauthorizedException(
                'Failed to delete transaction. Please try again.',
            );
        }
    }

    async getAllTransactions(userId: string): Promise<Transactions[]> {
        const user = await this.userRepository.findOneByID(userId);

        if (!user) {
            throw new UnauthorizedException(
                'User not found. Please provide a valid user ID.',
            );
        }

        const transactions = await this.transactionRepository.findAllByUserId(userId);

        if (!transactions || transactions.length === 0) {
            throw new UnauthorizedException(
                'No transactions found for this user.',
            );
        }

        const result = transactions.map((transaction) => {
        const { user, ...rest } = transaction;
        return rest as Transactions; 
        });

        return result
    }

    async getTransactionById(userId: string, transactionId: string): Promise<Transactions> {
        const user = await this.userRepository.findOneByID(userId);

        if (!user) {
            throw new UnauthorizedException(
                'User not found. Please provide a valid user ID.',
            );
        }

        const transaction = await this.transactionRepository.findOneByID(transactionId);
        if (!transaction) {
            throw new UnauthorizedException(
                'Transaction not found. Please provide a valid transaction ID.',
            );
        }
        if (transaction.userId !== userId) {
            throw new UnauthorizedException(
                'You do not have permission to access this transaction.',
            );
        }
        return omit(transaction, ['user']);
    }

    async getTransactionByCategory(userId: string, category: string): Promise<Transactions[]> {
        const user = await this.userRepository.findOneByID(userId);

        if (!user) {
            throw new UnauthorizedException(
                'User not found. Please provide a valid user ID.',
            );
        }
        return await this.transactionRepository.findByUserIdAndCategory(userId, category.toUpperCase());
    }

    async getTransactionByType(userId: string, type: string): Promise<Transactions[]> {
        const user = await this.userRepository.findOneByID(userId);

        if (!user) {
            throw new UnauthorizedException(
                'User not found. Please provide a valid user ID.',
            );
        }

        const transactions = await this.transactionRepository.findByUserIdAndType(userId, type.toUpperCase() as 'INCOME' | 'EXPENSE');

        return transactions.map((transaction) => {
            const { user, ...rest } = transaction;
            return rest as Transactions;
        }
        );
    }

    async getTransactionByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Transactions[]> {
        const user = await this.userRepository.findOneByID(userId);

        if (!user) {
            throw new UnauthorizedException(
                'User not found. Please provide a valid user ID.',
            );
        }

        const transactions = await this.transactionRepository.findByUserIdAndDateRange(userId, new Date(startDate), new Date(endDate));
    
        return transactions.map((transaction) => {
            const { user, ...rest } = transaction;
            return rest as Transactions;
        });
    }
    
}
