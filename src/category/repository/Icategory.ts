import { CreateCategoryDto } from "../dto/createCategory";
import { UpdatePartialCategoryDto } from "../dto/updateCategory";

export interface ICategoryRepository {
    createCategory(userId: string ,CreateCategoryDto: CreateCategoryDto): Promise<any>;
    getAllCategories(userId: string): Promise<any[]>;
    getCategoryById(userId: string,id: string): Promise<any>;
    updateCategory(userId: string,id: string, UpdatePartialCategoryDto: UpdatePartialCategoryDto): Promise<any>;
    getCategoryByName(userId: string, name: string): Promise<any>;
    deleteCategory(userId: string,id: string): Promise<any>;
}