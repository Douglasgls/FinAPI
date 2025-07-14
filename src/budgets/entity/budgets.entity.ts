import { Category } from "src/category/entity/category.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('budgets')
export class budgets {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ unique: false, nullable: false })
    name:string

    @ManyToOne(() => User, user => user.budgets)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Category, category => category.budgets)
    category: Category;

    @Column({ type: 'decimal' })
    limit: number;
    
    @Column({ type: 'timestamp' })
    dateStart: Date;

    @Column({ type: 'timestamp' })
    dateEnd: Date;

    @Column({ type: 'uuid', nullable: true })
    userId?: string;

    @Column({ type: 'uuid', nullable: true })
    categoryId?: string;
}