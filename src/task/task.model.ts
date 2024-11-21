import { Table, ForeignKey, DataType, Column, Model, PrimaryKey, AllowNull } from "sequelize-typescript";
import { User } from "src/user/user.model";

@Table
export class Task extends Model<Task> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    }) id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    }) title: string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    }) description: string

    @Column({
        type: DataType.DATE,
        allowNull: false
    }) dueDate: Date

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isIn: [['pending', 'in-progress', 'completed']],
        }
    }) status: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            isIn: [['low', 'medium', 'high']],
        },
    }) priority: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: true,
    })
    createdBy: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    assignedTo: string;

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    tags: string[];
}