import { IsString, IsOptional, IsIn, IsUUID, IsArray } from "class-validator";

export class FilterTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsIn(['pending', 'in-progress', 'completed'])
    @IsOptional()
    status?: string;

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