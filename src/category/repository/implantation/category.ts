import { InjectRepository } from "@nestjs/typeorm";
import { ICategoryRepository } from "../Icategory";
import { Category } from "../../entity/category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "../../dto/createCategory";
import { UpdatePartialCategoryDto } from "../../dto/updateCategory";
import { Injectable } from "@nestjs/common";


@Injectable()
export class categoryRepository implements ICategoryRepository {

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    )
    {}

    async createCategory(userId: string, CreateCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoryRepository.save({
            ...CreateCategoryDto,
            userId: userId,
            createdAt: new Date(),
        });
    }
        

    async getAllCategories(userId: string): Promise<Category[]> {
        return this.categoryRepository.find({
            where: { user: {id: userId} },
        });
    }

    async getCategoryById(userId: string, id: string): Promise<Category | null> {
        return this.categoryRepository.findOne({
            where: { user: {id: userId} },
        });
    }

    async getCategoryByName(userId: string, name: string): Promise<Category | null> {
        return this.categoryRepository.findOne({
            where: { user: {id: userId} },
        });
    }

    async updateCategory(userId: string, id: string, UpdatePartialCategoryDto: UpdatePartialCategoryDto): Promise<Category> {
        const category = await this.categoryRepository.findOne({
            where: { user: {id: userId} },
        })

        return this.categoryRepository.save({
            ...category,
            ...UpdatePartialCategoryDto,
        });
    }

    async deleteCategory(userId: string, id: string): Promise<any> {
        return this.categoryRepository.delete({
            id: id,
            user: {id: userId},
        });
    }
}
