import { IsOptional } from "class-validator";

export class updateBudgetsDto {
    @IsOptional()
    name: string;
    @IsOptional()
    limit: number;
    @IsOptional()
    categoryId: string;
    @IsOptional()
    dateStart: Date;
    @IsOptional()
    dateEnd: Date
}