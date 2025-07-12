import { Body, Controller,Delete,Get,HttpCode,Param,Patch,Post,UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory';
import { Category } from './entity/category.entity';
import { User } from 'src/transactions/decorators/user.decorator';
import { UpdatePartialCategoryDto } from './dto/updateCategory';

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    async createCategory(@User('id') userId: string, @Body()createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryService.createCategory(userId, createCategoryDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getAllCategories(@User('id') userId: string): Promise<Category[]> {
        return this.categoryService.getAllCategories(userId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getCategoryById(@User('id') userId: string, id: string): Promise<Category | null> {
        return this.categoryService.getCategoryById(userId, id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async updateCategory(@User('id') userId: string, @Param('id') id: string, @Body() updatePartialCategoryDto: UpdatePartialCategoryDto): Promise<Category> {
        return this.categoryService.updateCategory(userId,
            id,
            updatePartialCategoryDto,
        );  
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async deleteCategory(@User('id') userId: string, @Param('id') id: string): Promise<any> {
        return this.categoryService.deleteCategory(userId, id);
    }

}
