import { Body, Controller, Get, Param, Patch, Post, Delete, UseGuards, HttpCode, Query } from '@nestjs/common';
import { createTransactionDto } from './dto/createTransaction';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../transactions/decorators/user.decorator';
import { Transactions } from './entity/transactions.entity';
import { updateTransactionDto } from './dto/updateTransaction';

@Controller('trans')
export class TransactionsController {

    constructor(
        private readonly transactionsService: TransactionsService
    ){}

    @Get('hello')
    @HttpCode(200)
    async hello(): Promise<string> {
        return 'Hello World!';
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    async createTransaction(@User('id') userId: string, @Body() transaction: createTransactionDto): Promise<Transactions> {
        return await this.transactionsService.createTransaction(transaction, userId);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async updatePartialTransaction(
        @User('id') userId: string,
        @Param('id') transactionId: string,
        @Body() transaction: updateTransactionDto,
    ): Promise<Transactions> {
        return await this.transactionsService.updatePartialTransaction(userId, transactionId, transaction);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async deleteTransaction(
        @User('id') userId: string,
        @Param('id') transactionId: string,
    ): Promise<void> {
        return await this.transactionsService.deleteTransaction(userId, transactionId);
    } 

    @Get()
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getTransactionByUserId(@User('id') userId: string): Promise<Transactions[]> {
        return await this.transactionsService.getAllTransactions(userId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getTransactionById(@User('id') userId: string,@Param('id') transactionId: string): Promise<Transactions> {
        return await this.transactionsService.getTransactionById(userId, transactionId);
    }

    @Get('category/:category')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getTransactionByCategory(@User('id') userId: string, @Param('category') category: string): Promise<Transactions[]> {
        return await this.transactionsService.getTransactionByCategory(userId, category);
    }

    @Get('/type/:type')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getTransactionByType(@User('id') userId: string, @Param('type') type: string): Promise<Transactions[]> {
        return await this.transactionsService.getTransactionByType(userId, type);
    }

    @Post('/date-range')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getTransactionByStartEndToday(@User('id') userId: string, @Query('startDate') startDate: Date):Promise<Transactions[]> {
        return await this.transactionsService.getTransactionByDateRange(userId, startDate, new Date());
    }   
}
