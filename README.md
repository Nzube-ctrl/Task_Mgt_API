# Task Management API

A RESTful API for managing tasks in a task management system. This API allows users to create, update, delete, and list tasks.

## Features
- User authentication and authorization
- Task CRUD operations (Create, Read, Update, Delete)
- Task filtering by status, priority, and due date
- User roles (Admin, Regular User)
- Email notifications for task deadlines

## Technologies Used
- Node.js
- NestJS
- Sequelize (with MySQL)
- JWT Authentication
- Bcrypt for password hashing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repository-name.git

2. Install dependencies
    ```bash
    npm install
3. Set up environment variables: Create a .env file in the root directory and add the following:
    DB_HOST=your-database-host
    DB_PORT=your-database-port
    DB_USERNAME=your-database-username
    DB_PASSWORD=your-database-password
    DB_NAME=your-database-name
    JWT_SECRET=your-jwt-secret
4. Start the application: 
    npm run start

API Endpoints
Authentication
POST /auth/login: Login and receive a JWT token.
POST /auth/register: Register a new user.

Tasks
GET /tasks: Retrieve a list of tasks.
POST /tasks: Create a new task.
PUT /tasks/:id: Update an existing task.
DELETE /tasks/:id: Delete a task.

Contributing
Fork the repository
Create a new branch (git checkout -b feature/your-feature)
Commit your changes (git commit -am 'Add new feature')
Push to the branch (git push origin feature/your-feature)
Create a new Pull Request

License
This project is licensed under the MIT License.# Task_Mgt_API
