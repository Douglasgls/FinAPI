import { IsOptional, IsIn, Min } from "class-validator";

export class updateTransactionDto {
    @IsOptional()
    description?: string;

    @IsOptional()
    @Min(1)
    value?: number;

    @IsOptional()
    category?: string;

    @IsOptional()
    @IsIn(['INCOME', 'EXPENSE'])
    type?: 'INCOME' | 'EXPENSE';

    @IsOptional()
    createdAt?: Date;
}