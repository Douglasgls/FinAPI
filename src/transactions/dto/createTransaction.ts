export interface createTransactionDto {
    id?: string;
    value: number;
    description: string;
    category: string;
    type: 'INCOME' | 'EXPENSE';
    createdAt?: Date;
}