import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ICategoryRepository } from './repository/Icategory';
import { Category } from './entity/category.entity';
import { CreateCategoryDto } from './dto/createCategory';
import { UpdatePartialCategoryDto } from './dto/updateCategory';


@Injectable()
export class CategoryService {
    constructor(
        @Inject('ICategoryRepository')
        private readonly categoryRepository: ICategoryRepository,
    ) {}

    async createCategory(
    userId: string,
    createCategoryDto: CreateCategoryDto,
    ): Promise<Category> {
    const existingCategory = await this.categoryRepository.getCategoryByName(
        userId,
        createCategoryDto.name,
    );

    if (existingCategory) {
        throw new BadRequestException('Category already exists');
    }

    const name = createCategoryDto.name.toUpperCase();
    const description = createCategoryDto.description?.toUpperCase();

    const newCategory = {
        name,
        description,
        userId,
    };

    return this.categoryRepository.createCategory(userId, newCategory);
    }

    async getAllCategories(userId: string): Promise<Category[]> {
        return this.categoryRepository.getAllCategories(userId);
    }

    async getCategoryById(userId: string, id: string): Promise<Category | null> {
        return this.categoryRepository.getCategoryById(userId, id);
    }

    async updateCategory(
        userId: string,
        id: string,
        updatePartialCategory: UpdatePartialCategoryDto,
    ): Promise<Category> {
        const existingCategory = await this.categoryRepository.getCategoryById(userId, id);
        if (!existingCategory) {
            throw new BadRequestException('Category not found');
        }
              
        if(updatePartialCategory && updatePartialCategory.name) {
            const existingCategoryByName = await this.categoryRepository.getCategoryByName(
                userId,
                updatePartialCategory.name.toUpperCase(),
            );

            if (existingCategoryByName && existingCategoryByName.id === id) {
                throw new BadRequestException('Category name already exists');
            }

            updatePartialCategory.name = updatePartialCategory.name.toUpperCase();
        }

        if (updatePartialCategory && updatePartialCategory.description) {
            updatePartialCategory.description = updatePartialCategory.description.toUpperCase();
        }

        return this.categoryRepository.updateCategory(userId, id, updatePartialCategory);
    }

    async deleteCategory(userId: string, id: string): Promise<any> {
        const existingCategory = await this.categoryRepository.getCategoryById(userId, id);
        if (!existingCategory) {
            throw new BadRequestException('Category not found');
        }

        return this.categoryRepository.deleteCategory(userId, id);
    }
}
