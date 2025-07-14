import { budgets } from 'src/budgets/entity/budgets.entity';
import { Category } from 'src/category/entity/category.entity';
import { Transactions } from 'src/transactions/entity/transactions.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  username: string;

  @OneToMany(() => Category, category => category.user)
  categories?: Category[]

  @OneToMany(() => Transactions, transaction => transaction.user)
  transactions?: Transactions[]

  @OneToMany(() => budgets, budgets => budgets.user)
  budgets?: budgets[]

  @Column()
  password_hash: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: null | Date;
}
