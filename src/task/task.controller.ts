import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
// import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { CreateTaskDto } from 'src/Dto/create.task.dto';
import { UpdateTaskDto } from 'src/Dto/update.task.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiBadRequestResponse } from '@nestjs/swagger';


@UseGuards(AuthenticationGuard)
@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Post('')
    @ApiOperation({ summary: `Create a task` })
    @ApiCreatedResponse({ description: `Task created successfully`, type: CreateTaskDto })
    async createTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto, @Req() req: any) {
        const createdBy = req.user.id;
        const task = await this.taskService.createTask(createTaskDto, createdBy);
        return { message: `Task created successfully!`, data: task }
    }

    @Get('')
    @ApiOperation({ summary: `Get all tasks` })
    @ApiOkResponse({ description: `Getting all tasks in the database` })
    async getAllTasks() {
        const tasks = await this.taskService.getAllTasks();
        return { message: `Tasks retrieved successfully!`, data: tasks }
    }

    @Get(':id')
    @ApiOperation({ summary: `Getting a single task by id` })
    @ApiOkResponse({ description: `Getting a single task from the database` })
    async getTaskById(@Param('id') id: string) {
        const task = await this.taskService.getTaskById(id);
        return { message: `Task retrieved successfully!`, data: task }
    }

    @Put(':id')
    @ApiOperation({ summary: `Updating a single task` })
    @ApiOkResponse({ description: `Updating a single task ` })
    async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        const updatedTask = await this.taskService.updateTask(id, updateTaskDto);
        return { message: `Task updated successfully!`, data: updatedTask }
    }

    @Delete(':id')
    @ApiOperation({ summary: `Deleting a task` })
    @ApiOkResponse({ description: `Deleting a task` })
    async deleteTask(@Param('id') id: string) {
        await this.taskService.deleteTask(id);
        return { message: `Task deleted successfully!` }
    }
}
