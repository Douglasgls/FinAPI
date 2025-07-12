import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,JoinColumn } from 'typeorm';
import { IsNotEmpty, Min } from 'class-validator';
import { User } from 'src/user/entity/user.entity';
import { Category } from 'src/category/entity/category.entity';

@Entity('transactions')
export class Transactions {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(() => User , user => user.transactions)
    @JoinColumn({ name: 'userId' })
    user?: User;

    @Column({ type: 'decimal' })
    @IsNotEmpty()
    @Min(1)
    value: number;

    @Column()
    description: string;

   @ManyToOne(() => Category, category => category.transactions, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'categoryId' })
    category?: Category;

    @Column({ type: 'enum', enum: ['INCOME', 'EXPENSE']})
    @IsNotEmpty()
    type: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'uuid', nullable: true })
    userId?: string;

    @Column({ type: 'uuid', nullable: true })
    categoryId?: string;
}