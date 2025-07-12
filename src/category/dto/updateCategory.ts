import { IsOptional } from "class-validator";

export class UpdatePartialCategoryDto {
    @IsOptional()
    name?: string;
    @IsOptional()
    description?: string;
}

