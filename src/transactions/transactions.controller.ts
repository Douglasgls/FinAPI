import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Transactions } from './entity/transactions.entity';
import { createTransactionDto } from './dto/createTransaction';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../transactions/decorators/user.decorator';
import { User as UserEntity } from 'src/user/entity/user.entity';

@Controller('trans')
export class TransactionsController {

    constructor(
        private readonly transactionsService: TransactionsService
    ){}

    @Get()
    async hello(): Promise<string> {
        return 'Hello World!';
    }
    

    @Post()
    @UseGuards(JwtAuthGuard)
    async createTransaction(@User('id') userId: string, @Body() transaction: createTransactionDto): Promise<any> {
        return await this.transactionsService.createTransaction(transaction, userId);
    }

}
