import { budgets } from "../entity/budgets.entity"

export interface IBudgetsRepository {
    create(budget: budgets): Promise<budgets> 
    getAll(userId: string): Promise<budgets[]>
    getOne(userId: string,id: string): Promise<budgets | null>
    delete(id: string): Promise<void>
    updatePartial(id: string, partial: Partial<budgets>): Promise<budgets | null>
}