import { IsNotEmpty } from "class-validator";

export class UpdatePartialCategoryDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description?: string;
}

