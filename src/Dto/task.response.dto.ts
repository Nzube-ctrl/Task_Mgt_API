import { IsString, IsOptional, IsDateString, IsUUID, IsArray } from "class-validator";

export class TaskResponseDto {
    @IsUUID()
    id: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDateString()
    dueDate: Date;

    @IsString()
    status: string;

    @IsString()
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