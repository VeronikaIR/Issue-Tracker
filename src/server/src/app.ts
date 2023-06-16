import * as express from 'express';
import * as cors from 'cors';
import tickets from './routes/tickets';
import projects from './routes/projects';
import {loadMigrations} from './database/database.js';
import users from "./routes/users";

//Load database
loadMigrations();


//Server setup
const app = express();
app.use(cors());
app.use(express.json({ type: 'application/json' }));

//Define routes for the endpoints
app.use('/tickets', tickets);
app.use('/projects', projects);
app.use('/users', users);

app.listen(3000, () => {console.log("The server is running on port 3000...")});

//to load test data in the tables
//
/*const CreateTaskDto  = require('./database/dtos/create/CreateTaskDto');
const  CreateUserDto  = require('./database/dtos/create/CreateUserDto');
const CreateProjectDto = require('./database/dtos/create/CreateProjectDto');
const UserRepository  = require('./database/repositories/UserRepository');
const ProjectRepository  = require('./database/repositories/ProjectRepository');
const  TaskRepository  = require('./database/repositories/TaskRepository');


async function runDemo() {
    try {
        // User Repository Demo
        console.log('User Repository Demo');
        console.log('---------------------');


        // Create a user
        const createdUser1 = await UserRepository.createUser(
            new CreateUserDto('John Doe', 'john1@example.com', 'hashed_password')
        );
        console.log('New user created:', createdUser1);


        // Create a user
        const createdUser2 = await UserRepository.createUser(
            new CreateUserDto('John Doe', 'john2@example.com', 'hashed_password')
        );
        console.log('New user created:', createdUser2);


        //Get user by ID
        const userId = createdUser2.id;
        const retrievedUserDto = await UserRepository.getUserById(userId);
        console.log('Retrieved user:', retrievedUserDto);


        // Update user
        const updatedUserDto = await UserRepository.updateUserById(userId, {
            name: 'John Smith',
            email: 'john.smith@example.com',
            hashedPassword: 'new_password'
        });
        console.log('Updated user:', updatedUserDto);


        // Delete user
        const deletedUserDto = await UserRepository.deleteUserById(userId);
        console.log('Deleted user:', deletedUserDto);


        console.log('\n');


        // Project Repository Demo
        console.log('Project Repository Demo');
        console.log('------------------------');


        // Create a project
        const createdProject1 = await ProjectRepository.createProject(
            new CreateProjectDto('PROJ-001', 'Awesome Project', 'An amazing project to showcase our skills', new Date(), createdUser1.id)
        );
        console.log('New project created:', createdProject1);


        const createdProject2 = await ProjectRepository.createProject(
            new CreateProjectDto('PROJ-001', 'Awesome Project', 'An amazing project to showcase our skills', new Date(), createdUser1.id)
        );
        console.log('New project created:', createdProject2);


        // Get project by ID
        const projectId = createdProject2.id;
        const retrievedProjectDto = await ProjectRepository.getProjectById(projectId);
        console.log('Retrieved project:', retrievedProjectDto);


        // Get all projects
        const allProjects = await ProjectRepository.findAllProjects();
        console.log('All projects:', allProjects);


        // Update project
        const updatedProjectDto = await ProjectRepository.updateProjectById(projectId, {
            name: 'Updated Project',
            description: 'An updated project with new features',
            creationDate: new Date(),
            leadUserId: createdUser1.id
        });
        console.log('Updated project:', updatedProjectDto);


        // Delete project
        const deletedProjectDto = await ProjectRepository.deleteProjectById(projectId);
        console.log('Deleted project:', deletedProjectDto);


        console.log('\n');


        // Task Repository Demo
        console.log('Task Repository Demo');
        console.log('---------------------');


        // Create a task
        const createdTask1 = await TaskRepository.createTask(
            new CreateTaskDto('TASK-001', 'Implement Feature X', 'High', 'Implement the new feature with the specified requirements', new Date(), 'In Progress', createdProject1.id, createdUser1.id)
        );
        console.log('New task created:', createdTask1);


        const createdTask2 = await TaskRepository.createTask(
            new CreateTaskDto('TASK-001', 'Implement Feature X', 'High', 'Implement the new feature with the specified requirements', new Date(), 'In Progress', createdProject1.id, createdUser1.id)
        );
        console.log('New task created:', createdTask2);


        // Get task by ID
        const taskId = createdTask2.id;
        const retrievedTaskDto = await TaskRepository.getTaskById(taskId);
        console.log('Retrieved task:', retrievedTaskDto);


        // Update task
        const updatedTaskDto = await TaskRepository.updateTaskById(taskId, {
            taskKey: 'TASK-002',
            title: 'Implement Feature Y',
            description: 'Medium',
            priority: 'Implement another feature with medium priority',
            dueDate: new Date(),
            status: 'In Progress',
            projectId: createdProject1.id,
            assigneeId: createdUser1.id
        });
        console.log('Updated task:', updatedTaskDto);


        // Delete task
        // const deletedTaskDto = await TaskRepository.deleteTaskById(taskId);
        // console.log('Deleted task:', deletedTaskDto);

        const tasksByProjectId = await TaskRepository.getAllTasksByProjectId(3);
        console.log('All tasks by project ID:', tasksByProjectId);
        } catch (error) {
        console.error('An error occurred:', error);
    }




    console.log('-------------------------');
    console.log('-----END OF THE DEMO-----');
 }

runDemo();*/