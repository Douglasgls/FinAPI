import { Injectable, Inject } from '@nestjs/common';
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
        throw new Error('Category already exists');
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
        updatePartialCategoryDto: UpdatePartialCategoryDto,
    ): Promise<Category> {
        const existingCategory = await this.categoryRepository.getCategoryById(userId, id);
        if (!existingCategory) {
            throw new Error('Category not found');
        }
        const existingCategoryByName = await this.categoryRepository.getCategoryByName(
            userId,
            updatePartialCategoryDto.name.toUpperCase(),
        );

        if (existingCategoryByName && existingCategoryByName.id !== id) {
            throw new Error('Category name already exists');
        }

        updatePartialCategoryDto.name = updatePartialCategoryDto.name.toUpperCase();

        if (updatePartialCategoryDto.description) {
            updatePartialCategoryDto.description = updatePartialCategoryDto.description.toUpperCase();
        }

        return this.categoryRepository.updateCategory(userId, id, updatePartialCategoryDto);
    }

    async deleteCategory(userId: string, id: string): Promise<any> {
        return this.categoryRepository.deleteCategory(userId, id);
    }
}
