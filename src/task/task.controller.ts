import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
// import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { CreateTaskDto } from 'src/Dto/create.task.dto';
import { UpdateTaskDto } from 'src/Dto/update.task.dto';


@UseGuards(AuthenticationGuard)
@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Post('')
    async createTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto, @Req() req: any) {
        const createdBy = req.user.id;
        const task = await this.taskService.createTask(createTaskDto, createdBy);
        return { message: `Task created successfully!`, data: task }
    }

    @Get('')
    async getAllTasks() {
        const tasks = await this.taskService.getAllTasks();
        return { message: `Tasks retrieved successfully!`, data: tasks }
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string) {
        const task = await this.taskService.getTaskById(id);
        return { message: `Task retrieved successfully!`, data: task }
    }

    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        const updatedTask = await this.taskService.updateTask(id, updateTaskDto);
        return { message: `Task updated successfully!`, data: updatedTask }
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string) {
        await this.taskService.deleteTask(id);
        return { message: `Task deleted successfully!` }
    }
}
