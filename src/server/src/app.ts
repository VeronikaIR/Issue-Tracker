import * as express from 'express';
import * as cors from 'cors';
import {loadMigrations} from './database/database';
import tickets from './routes/tickets';
import projects from './routes/projects';
import users from "./routes/users";

const CreateTaskDto = require('./database/dtos/create/CreateTaskDto');
const CreateUserDto = require('./database/dtos/create/CreateUserDto');
const CreateProjectDto = require('./database/dtos/create/CreateProjectDto');
const UserRepository = require('./database/repositories/UserRepository');
const ProjectRepository = require('./database/repositories/ProjectRepository');
const TaskRepository = require('./database/repositories/TaskRepository');

const bcrypt = require('bcrypt');

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

async function runDemo() {
    try {
        // User Repository Demo
        console.log('User Repository Demo');
        console.log('---------------------');

        // Create a user
       const password1 = await bcrypt.hash('Test123!', 10);
        const createdUser1 = await UserRepository.createUser(
            new CreateUserDto('John Doe', 'john1@example.com', password1)
        );
        console.log('New user created:', createdUser1);


        // Create a user
        const password2 = await bcrypt.hash('Test1234!', 10);
        const createdUser2 = await UserRepository.createUser(
            new CreateUserDto('John Doe', 'john2@example.com', password2)
        );
        console.log('New user created:', createdUser2);


        //Get user by ID
        const userId = createdUser2.id;
        const retrievedUserDto = await UserRepository.getUserById(userId);
        console.log('Retrieved user:', retrievedUserDto);
        console.log('\n');


        // Project Repository Demo
        console.log('Project Repository Demo');
        console.log('------------------------');


        // Create a project
        const createdProject1 = await ProjectRepository.createProject(
            new CreateProjectDto('Web Project', 'An amazing project to showcase our skills', new Date(), createdUser1.id)
        );
        console.log('New project created:', createdProject1);


        const createdProject2 = await ProjectRepository.createProject(
            new CreateProjectDto('Awesome Project', 'An amazing project to showcase our coding skills', new Date(), createdUser2.id)
        );
        console.log('New project created:', createdProject2);


        // Get project by ID
        const projectId = createdProject2.id;
        const retrievedProjectDto = await ProjectRepository.getProjectById(projectId);
        console.log('Retrieved project:', retrievedProjectDto);


        // Get all projects
        const allProjects = await ProjectRepository.findAllProjects();
        console.log('All projects:', allProjects);

        // Task Repository Demo
        console.log('Task Repository Demo');
        console.log('---------------------');


        // Create a task
        const createdTask1 = await TaskRepository.createTask(
            new CreateTaskDto('Implement Feature X', 'Implement the new feature with the specified requirements', 'Low', new Date(), 'In Progress', createdProject1.id, createdUser1.id)
        );
        console.log('New task created:', createdTask1);


        const createdTask2 = await TaskRepository.createTask(
            new CreateTaskDto('Implement Feature TEST', 'Implement the new feature with the specified requirements', 'High',new Date(), 'In Progress', createdProject1.id, createdUser1.id)
        );
        console.log('New task created:', createdTask2);


        // Get task by ID
        const taskId = createdTask2.id;
        const retrievedTaskDto = await TaskRepository.getTaskById(taskId);
        console.log('Retrieved task:', retrievedTaskDto);

        const tasksByProjectId = await TaskRepository.getAllTasksByProjectId(3);
        console.log('All tasks by project ID:', tasksByProjectId);
    } catch (error) {
        console.error('An error occurred:', error);
    }


    console.log('-------------------------');
    console.log('-----END OF THE DEMO-----');
}

//runDemo();