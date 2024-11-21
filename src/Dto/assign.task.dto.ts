import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AssignTaskDto {
    @IsUUID()
    @IsNotEmpty()
    taskId: string;

    @IsString()
    @IsNotEmpty()
    assignedTo: string;
}