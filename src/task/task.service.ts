import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from 'src/Dto/create.task.dto';
import { Task } from './task.model';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateTaskDto } from 'src/Dto/update.task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task)
        private readonly taskModel: typeof Task,
    ) { }

    async createTask(createTaskDto: CreateTaskDto, createdBy: string) {
        const { title, description, dueDate, status, priority, assignedTo, tags } = createTaskDto;
        const newTask = await this.taskModel.create({
            title,
            description,
            dueDate,
            status,
            priority,
            assignedTo,
            tags,
            createdBy
        });
        return newTask;
    }

    async getAllTasks(): Promise<Task[]> {
        return this.taskModel.findAll(); //Retrieving tasks without filters
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.taskModel.findByPk(id)
        if (!task) {
            throw new UnauthorizedException(`Task with ID ${id} not found`)
        }
        return task;
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.taskModel.findByPk(id);
        if (!task) {
            throw new UnauthorizedException(`Task with ID ${id} not found`);
        }
        await task.update(updateTaskDto);
        return task;
    }

    async deleteTask(id: string): Promise<void> {
        const task = await this.taskModel.findByPk(id);
        if (!task) {
            throw new UnauthorizedException(`Task with ID ${id} not found`);
        }
        await task.destroy();
    }
}
