import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,JoinColumn } from 'typeorm';
import { IsNotEmpty, Min } from 'class-validator';
import { User } from 'src/user/entity/user.entity';

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

    @Column() 
    @IsNotEmpty()
    category: string;

    @Column({ type: 'enum', enum: ['INCOME', 'EXPENSE']})
    @IsNotEmpty()
    type: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'uuid', nullable: true })
    userId?: string;
}