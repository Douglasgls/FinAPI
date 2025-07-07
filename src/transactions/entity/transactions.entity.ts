import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, Min } from 'class-validator';

@Entity('transactions')
export class Transactions {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    @IsNotEmpty()
    userId: string;

    @Column({ type: 'decimal' })
    @IsNotEmpty()
    @Min(1)
    value: number;

    @Column()
    description: string;

    @Column() 
    @IsNotEmpty()
    category: string;

    @Column({ type: 'enum', enum: ['INCOME', 'EXPENSE']})
    @IsNotEmpty()
    type: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}