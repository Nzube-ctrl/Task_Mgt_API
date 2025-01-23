import { IsString, IsNotEmpty, IsDateString, IsOptional, IsIn, IsUUID, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()//can add example data in an object
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    dueDate: Date;

    @IsString()
    @IsOptional()
    @ApiProperty()
    status: string;

    @IsString()
    @IsIn(['low', 'medium', 'high'])
    @IsOptional()
    @ApiProperty()
    priority?: string;

    @IsUUID()
    @IsOptional()
    @ApiProperty()
    createdBy?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    assignedTo?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    @ApiProperty({ required: false })//can also add a description here or ApiPropertyOptional decorator
    tags?: string[];
}