import { InjectRepository } from "@nestjs/typeorm";
import { IBudgetsRepository } from "../../repository/Ibudgets";
import { budgets } from "src/budgets/entity/budgets.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BudgetsRepository implements IBudgetsRepository {
    constructor(
        @InjectRepository(budgets)
        private readonly budgetsRepository: Repository<budgets>,
    ){}

    async create(budget: budgets): Promise<budgets> {
        return this.budgetsRepository.save(budget)
    }

    async getAll(userId: string): Promise<budgets[]> {
        return this.budgetsRepository.find({where: {user: {id: userId}}})
    }

    async getOne(userId: string,id: string): Promise<budgets | null> {
        return this.budgetsRepository.findOneBy({id, user: {id: userId}})
    }

    async delete(id: string): Promise<void> {
        await this.budgetsRepository.delete({id})
    }

    async updatePartial(id: string, partial: Object): Promise<budgets | null> {
        await this.budgetsRepository.update(id, partial)
        return this.budgetsRepository.findOneBy({id})
    }

} 