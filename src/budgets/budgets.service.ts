import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IBudgetsRepository } from './repository/Ibudgets';
import { IUserRepository } from 'src/user/repository/IUserRepository';
import { budgets } from './entity/budgets.entity';
import { createBudgetDto } from './dto/createBudgets';
import { updateBudgetsDto } from './dto/updateBudgets';
import { ICategoryRepository } from 'src/category/repository/Icategory';
import { Category } from 'src/category/entity/category.entity';
import { omit } from 'lodash';

@Injectable()
export class BudgetsService {
    constructor(
        @Inject('IBudgetsRepository')
        private readonly budgetsRepository: IBudgetsRepository,

        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,

        @Inject('ICategoryRepository')
        private readonly categoryRepository: ICategoryRepository
    ) {}

    async getAll(userId: string): Promise<budgets[]> {
        const existsUser = await this.userRepository.findOneByID(userId);
        
        if (!existsUser) {
            throw new BadRequestException('User not found');
        }

        return this.budgetsRepository.getAll(userId);
    }

    async getOne(userId: string, id: string): Promise<budgets | null> {
        const existsUser = await this.userRepository.findOneByID(userId);
        
        if (!existsUser) {
            throw new BadRequestException('User not found');
        }

        const existsBudget = await this.budgetsRepository.getOne(userId, id);

        if (!existsBudget) {
            throw new BadRequestException('Budget not found');
        }

        console.log(existsBudget);

        if(existsBudget.userId !== userId) {
            throw new UnauthorizedException('You do not have permission to access this budget.');
        }

        return existsBudget;
    }

    async create(userId: string, budget: createBudgetDto): Promise<budgets> {
        const existsUser = await this.userRepository.findOneByID(userId);
        
        if (!existsUser) {
            throw new BadRequestException('User not found');
        }

        const existingCategory = await this.categoryRepository.getCategoryById(userId,budget.categoryId);

        const newBudget = {
            ...budget,
            id: crypto.randomUUID(),
            user: existsUser,
            category: existingCategory
        }

        let createdBudget = await this.budgetsRepository.create(newBudget);

        createdBudget = {
            ...createdBudget,
            userId: existsUser.id
        }

        return omit({...createdBudget}, ['user', 'category']) as budgets;
    }

    async delete(userId: string, id: string): Promise<void> {
        const existsUser = await this.userRepository.findOneByID(userId);
        
        if (!existsUser) {
            throw new BadRequestException('User not found');
        }

        const existsBudget = await this.budgetsRepository.getOne(userId, id);

        if (!existsBudget) {
            throw new BadRequestException('Budget not found');
        }

        return this.budgetsRepository.delete(id);
    }

    async updatePartial(userId: string, id: string, partial: updateBudgetsDto): Promise<budgets | null> {
        const existsUser = await this.userRepository.findOneByID(userId);
        
        if (!existsUser) {
            throw new BadRequestException('User not found');
        }

        const existsBudget = await this.budgetsRepository.getOne(userId, id);

        if (!existsBudget) {
            throw new BadRequestException('Budget not found');
        }

        if(partial && partial.categoryId) {
            const existingCategory:Category = await this.categoryRepository.getCategoryById(userId,partial.categoryId);
            if (!existingCategory) {
                throw new BadRequestException('Category not found');
            }
        }

        if(existsBudget.userId != userId) {
            throw new UnauthorizedException('You do not have permission to update this budget.');
        }

        return this.budgetsRepository.updatePartial(id, partial);
    }

}
