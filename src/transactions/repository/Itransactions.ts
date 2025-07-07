import { Transactions } from '../entity/transactions.entity';


export interface ITransactionRepository {
  create(transaction: Transactions): Promise<Transactions>;
  update(id: string, transaction: Transactions): Promise<Transactions | null>;
  updatePartial(id: string, partial: object): Promise<Transactions | null>;
  delete(id: string): Promise<boolean>;
  findOneByID(id: string): Promise<Transactions | null>;
  findAllByUserId(userId: string): Promise<Transactions[]>;
  getAll(): Promise<Transactions[]>;
  findByCategory(category: string): Promise<Transactions[]>;
  findByType(type: string): Promise<Transactions[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Transactions[]>;
  findByUserIdAndDateRange(userId: string, startDate: Date, endDate: Date): Promise<Transactions[]>;
  findByUserIdAndCategory(userId: string, category: string): Promise<Transactions[]>;
  findByUserIdAndType(userId: string, type: string): Promise<Transactions[]>;
  findByUserIdAndDescription(userId: string, description: string): Promise<Transactions[]>;
  findByUserIdAndValueRange(userId: string, minValue: number, maxValue: number): Promise<Transactions[]>;
  findByUserIdAndCreatedAt(userId: string, createdAt: Date): Promise<Transactions[]>;
  findByUserIdAndTypeAndCategory(userId: string, type: string, category: string): Promise<Transactions[]>;
  findByUserIdAndTypeAndDateRange(userId: string, type: string, startDate: Date, endDate: Date): Promise<Transactions[]>;
  findByUserIdAndCategoryAndDateRange(userId: string, category: string, startDate: Date, endDate: Date): Promise<Transactions[]>;
  findByUserIdAndTypeAndCategoryAndDateRange(userId: string, type: string, category: string, startDate: Date, endDate: Date): Promise<Transactions[]>;
  findByUserIdAndTypeAndValueRange(userId: string, type: string, minValue: number, maxValue: number): Promise<Transactions[]>;
  findByUserIdAndCategoryAndValueRange(userId: string, category: string, minValue: number, maxValue: number): Promise<Transactions[]>;
  findByUserIdAndTypeAndCategoryAndValueRange(userId: string, type: string, category: string, minValue: number, maxValue: number): Promise<Transactions[]>;
  findByUserIdAndDescriptionAndDateRange(userId: string, description: string, startDate: Date, endDate: Date): Promise<Transactions[]>;
  findByUserIdAndDescriptionAndType(userId: string, description: string, type: string): Promise<Transactions[]>;
  findByUserIdAndDescriptionAndCategory(userId: string, description: string, category: string): Promise<Transactions[]>;
  findByUserIdAndDescriptionAndValueRange(userId: string, description: string, minValue: number, maxValue: number): Promise<Transactions[]>;
  findByUserIdAndDescriptionAndCreatedAt(userId: string, description: string, createdAt: Date): Promise<Transactions[]>;
}