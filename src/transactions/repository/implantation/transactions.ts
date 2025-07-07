import { ITransactionRepository } from '../../repository/Itransactions';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from '../../entity/transactions.entity';
import { Between, Repository } from 'typeorm';
import { omit } from 'lodash';

export class TransactionsRepository implements ITransactionRepository {
    constructor(
        @InjectRepository(Transactions) 
        private readonly transactionsRepository: Repository<Transactions>,
    ) {}
    async create(transaction: Transactions): Promise<Transactions> {
        return await this.transactionsRepository.save(transaction);
    }

    async update(id: string, transaction: Transactions): Promise<Transactions | null> {
        await this.transactionsRepository.update(id, transaction);
        return this.transactionsRepository.findOne({ where: { id } });
    }

    async updatePartial(id: string, partial: object): Promise<Transactions | null> {
        await this.transactionsRepository.update(id, partial);
        return this.transactionsRepository.findOne({ where: { id } });
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.transactionsRepository.delete(id);
        return result.affected !== undefined && result.raw > 0;
    }

    async findOneByID(id: string): Promise<Transactions | null> {
        return this.transactionsRepository.findOne({ where: { id } });
    }

    async findAllByUserId(userId: string): Promise<Transactions[]> {
        return this.transactionsRepository.find({ where: { userId } });
    }

    async getAll(): Promise<Transactions[]> {
        return this.transactionsRepository.find();
    }

    async findByCategory(category: string): Promise<Transactions[]> {
        return this.transactionsRepository.find({ where: { category } });
    }

    async findByType(type: string): Promise<Transactions[]> {
        return this.transactionsRepository.find({ where: { type } });
    }

    async findByDateRange(startDate: Date, endDate: Date): Promise<Transactions[]> {
        return this.transactionsRepository.find({
            where: {
                createdAt: Between(startDate, endDate),
            },
        });
    }

    async findByUserIdAndDateRange(userId: string, startDate: Date, endDate: Date): Promise<Transactions[]> {
        return this.transactionsRepository.find({
            where: {
                userId,
                createdAt: Between(startDate, endDate),
            },
        });
    }

    async findByUserIdAndCategory(userId: string, category: string): Promise<Transactions[]> {
        return this.transactionsRepository.find({ where: { userId, category } });
    }

    async findByUserIdAndType(userId: string, type: string): Promise<Transactions[]> {
        return this.transactionsRepository.find({ where: { userId, type } });
    }

    async findByUserIdAndDescription(userId: string, description: string): Promise<Transactions[]> {
        return this.transactionsRepository.find({ where: { userId, description } });
    }

    async findByUserIdAndValueRange(userId: string, minValue: number, maxValue: number): Promise<Transactions[]> {
        return this.transactionsRepository.find({
            where: {
                userId,
                value: Between(minValue, maxValue),
            },
        });
    }

    async findByUserIdAndCreatedAt(userId: string, createdAt: Date): Promise<Transactions[]> {
        return this.transactionsRepository.find({ where: { userId, createdAt } });
    }

    async findByUserIdAndTypeAndCategory(userId: string, type: string, category: string): Promise<Transactions[]> {
        return this.transactionsRepository.find({ where: { userId, type, category } });
    }

    async findByUserIdAndTypeAndDateRange(userId: string, type: string, startDate: Date, endDate: Date): Promise<Transactions[]> {
        return this.transactionsRepository.find({
            where: {
                userId,
                type,
                createdAt: Between(startDate, endDate),
            },
        });
    }

    async findByUserIdAndCategoryAndDateRange(userId: string, category: string, startDate: Date, endDate: Date): Promise<Transactions[]> {
        return this.transactionsRepository.find({
            where: {
                userId,
                category,
                createdAt: Between(startDate, endDate),
            },
        });
    }

    async findByUserIdAndTypeAndCategoryAndDateRange(userId: string, type: string, category: string, startDate: Date, endDate: Date): Promise<Transactions[]> {
        return this.transactionsRepository.find({
            where: {
                userId,
                type,
                category,
                createdAt: Between(startDate, endDate),
            },
        });
    }

    async findByUserIdAndTypeAndValueRange(userId: string, type: string, minValue: number, maxValue: number): Promise<Transactions[]> {
        return this.transactionsRepository.find({
            where: {
                userId,
                type,
                value: Between(minValue, maxValue),
            },
        });
    }

    async findByUserIdAndCategoryAndValueRange(userId: string, category: string, minValue: number, maxValue: number): Promise<Transactions[]> {
        return this.transactionsRepository.find({
            where: {
                userId,
                category,
                value: Between(minValue, maxValue),
            },
        });
    }

    async findByUserIdAndTypeAndCategoryAndValueRange(userId: string, type: string, category: string, minValue: number, maxValue: number): Promise<Transactions[]> {
        return this.transactionsRepository.find({
            where: {
                userId,
                type,
                category,
                value: Between(minValue, maxValue),
            },
        });
    }

    async findByUserIdAndDescriptionAndDateRange(userId: string, description: string, startDate: Date, endDate: Date): Promise<Transactions[]> {
        return this.transactionsRepository.find({
            where: {
                userId,
                description,
                createdAt: Between(startDate, endDate),
            },
        });
    }

    async findByUserIdAndDescriptionAndType(userId: string, description: string, type: string): Promise<Transactions[]> {
        return this.transactionsRepository.find({ where: { userId, description, type } });
    }

    async findByUserIdAndDescriptionAndCategory(userId: string, description: string, category: string): Promise<Transactions[]> {
        return this.transactionsRepository.find({ where: { userId, description, category } });
    }

    async findByUserIdAndDescriptionAndValueRange(userId: string, description: string, minValue: number, maxValue: number): Promise<Transactions[]> {
        return this.transactionsRepository.find({
            where: {
                userId,
                description,
                value: Between(minValue, maxValue),
            },
        });
    }

    async findByUserIdAndDescriptionAndCreatedAt(userId: string, description: string, createdAt: Date): Promise<Transactions[]> {
        return this.transactionsRepository.find({ where: { userId, description, createdAt } });
    }

    async findByUserIdAndDescriptionAndUpdatedAt(userId: string, description: string): Promise<Transactions[]> {
        return this.transactionsRepository.find({ where: { userId, description } });
    }
}
