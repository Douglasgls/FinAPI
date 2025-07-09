import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class createTransactionDto {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsEnum(['INCOME', 'EXPENSE'], { message: 'type must be INCOME or EXPENSE' })
  type: 'INCOME' | 'EXPENSE';

  @IsOptional()
  createdAt?: Date;
}