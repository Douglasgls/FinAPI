import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ITransactionRepository } from '../transactions/repository/Itransactions';
import { Transactions } from './entity/transactions.entity';
import { randomUUID } from 'crypto';
import { createTransactionDto } from './dto/createTransaction';
import { IUserRepository } from 'src/user/repository/IUserRepository';
import { updateTransactionDto } from './dto/updateTransaction';
import { omit } from 'lodash';
import { ICategoryRepository } from 'src/category/repository/Icategory';

@Injectable()
export class TransactionsService {
    constructor(
        @Inject('ITransactionRepository') private readonly transactionRepository: ITransactionRepository,
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
        @Inject('ICategoryRepository') private readonly categoryRepository: ICategoryRepository
    ) {}

    async createTransaction(transaction: createTransactionDto, userId: string): Promise<Transactions> {

        const user = await this.userRepository.findOneByID(userId);

        if (!user) {
            throw new UnauthorizedException()
        }

        const existingCategory = await this.categoryRepository.getCategoryByName(userId, transaction.category.toUpperCase());
    
        if (!existingCategory) {
            throw new BadRequestException('Category not found');
        }

        if (existingCategory.userId !== userId) {
            throw new UnauthorizedException(
                'You do not have permission to create a transaction for this category.',
            );
        }

        const transactionPyload: Transactions = {
            ...transaction,
            createdAt: new Date(),
            id: randomUUID(),
            type: transaction.type.toUpperCase() as 'INCOME' | 'EXPENSE', 
            value: Number(transaction.value),
            description: transaction.description.toUpperCase(),
            user: user,
            category: existingCategory
        }; 

        const createdTransaction = await this.transactionRepository.create(transactionPyload);
        
        const category = existingCategory.name 

        return omit({...createdTransaction, category: category}, ['user','categoryId']);
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

        transaction.description = transaction.description?.toUpperCase();

        let category: any | undefined;

        if(transaction.category) {
            category = await this.categoryRepository.getCategoryByName(userId, transaction.category.toUpperCase());

            if (!category) {
                throw new BadRequestException('Category not found');
            }

            if (category.userId !== userId) {
                throw new UnauthorizedException(
                    'You do not have permission to create a transaction for this category.',
                );
            }
        }

        const updated = {
        ...existingTransaction,
        ...transaction,
        };

        if (category) {
            updated.category = category;
            updated.categoryId = category.id;
        }

        const updatedTransaction = await this.transactionRepository.update(transactionId, updated as Transactions);

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
        await this.transactionRepository.delete(transactionId);
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
