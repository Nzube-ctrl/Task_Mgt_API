import { IsString, IsNotEmpty, IsDateString, IsOptional, IsIn, IsUUID, IsArray } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDateString()
    @IsNotEmpty()
    dueDate: Date;

    @IsString()
    @IsOptional()
    status: string;

    @IsString()
    @IsIn(['low', 'medium', 'high'])
    @IsOptional()
    priority?: string;

    @IsUUID()
    @IsOptional()
    createdBy?: string;

    @IsString()
    @IsOptional()
    assignedTo?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];
}