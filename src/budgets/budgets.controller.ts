import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/transactions/decorators/user.decorator';
import { createBudgetDto } from './dto/createBudgets';
import { updateBudgetsDto } from './dto/updateBudgets';

@Controller('budgets')
@UseGuards(JwtAuthGuard)
export class BudgetsController {
    constructor(private readonly budgetsService: BudgetsService) {}

    @Get()
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async getAll(@User('id') userId: string) {
        return this.budgetsService.getAll(userId);
    }

    @Get(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async getOne(
        @User('id') userId: string,
        @Param('id', new ParseUUIDPipe()) id: string
    ) {
        return this.budgetsService.getOne(userId, id);
    }

    @Post()
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async create(
        @User('id') userId: string,
        @Body() budgetDto: createBudgetDto
    ) {
        console.log(userId);
        return this.budgetsService.create(userId, budgetDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    async delete(
        @User('id') userId: string,
        @Param('id', new ParseUUIDPipe()) id: string
    ) {
        return this.budgetsService.delete(userId, id);
    }

    @Patch(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async updatePartial(
        @User('id') userId: string,
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() partial: updateBudgetsDto
    ) {
        return this.budgetsService.updatePartial(userId, id, partial);
    }
}

