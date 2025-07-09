import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Transaction } from "typeorm";
import { User } from "src/user/entity/user.entity";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    
    @ManyToOne(() => User, user => user.categories)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ unique: true, nullable: false, length: 30 })
    name: string;

    @Column({ nullable: true, length: 255 })
    description?: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'uuid', nullable: true })
    userId?: string;
}