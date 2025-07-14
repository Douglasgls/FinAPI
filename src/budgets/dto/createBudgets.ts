import { IsNotEmpty, IsOptional } from "class-validator";

export class createBudgetDto {
    @IsOptional()
    id?: string
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    limit: number;
    @IsNotEmpty()
    categoryId: string;
    @IsOptional()
    dateStart: Date;
    @IsOptional()
    dateEnd: Date
}