import { IsDateString, IsOptional, IsString, IsIn, IsArray } from "class-validator";

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDateString()
    @IsOptional()
    dueDate?: Date;

    @IsString()
    @IsIn(['pending', 'in-progress', 'completed'])
    @IsOptional()
    status?: string;

    @IsString()
    @IsIn(['low', 'medium', 'high'])
    @IsOptional()
    priority?: string;

    @IsString()
    @IsOptional()
    assignedTo?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];
}