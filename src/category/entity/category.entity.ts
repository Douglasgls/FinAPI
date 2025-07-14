import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "src/user/entity/user.entity";
import { budgets } from "src/budgets/entity/budgets.entity";
import { Transactions } from "src/transactions/entity/transactions.entity";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    
    @ManyToOne(() => User, user => user.categories)
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(()=> budgets, budgets => budgets.category)
    budgets: budgets[]

    @OneToMany(() => Transactions, transaction => transaction.category, { cascade: true })
    transactions?: Transactions[]

    @Column({ unique: false, nullable: false, length: 30 })
    name: string;

    @Column({ nullable: true, length: 255 })
    description?: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'uuid', nullable: true })
    userId?: string;

    
}