import {Router, Request, Response} from 'express';
import {ProjectController} from '../controllers/projects-controller';
import {IProject} from "../interfaces/projects";

//Define tickets controller
const projectsController: ProjectController = new ProjectController();
const getProjectController = async (req: Request, res: Response, next: () => void) => {
    try {
        console.log('Controller initialization...');
        await projectsController.init();
        console.log('Initialized controller');
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({error: {message: error.message}});
    }
};

//Define router for the tickets request
const projectsRouter: Router = Router();
projectsRouter.use(getProjectController);

//Projects endpoints
projectsRouter.get('/', async (request: Request, response: Response) => {
    try {
        const projects = await projectsController.getProjectsData();
        response.status(200).json(projects);
    } catch (error) {
        console.error(error);
        response.status(500).json({message: error.message});
    }
});

projectsRouter.get('/:project_key', async (request: Request, response: Response) => {
    const {project_key} = request.params;

    try {
        const project = await projectsController.getProjectByProjectKey(Number(project_key));

        if (project) {
            response.status(200).json(project);
        } else {
            response.status(404).json({message: "Project not found"});
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({message: error.message});
    }
});

projectsRouter.get('/projects-by-user/:user_id', async (request: Request, response: Response) => {
    const {user_id} = request.params;

    try {
        const projects = await projectsController.getProjectsByUserId(Number(user_id));

        if (projects.length > 0) {
            response.status(200).json(projects);
        } else {
            response.status(404).json({message: "Projects not found"});
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({message: error.message});
    }
});

projectsRouter.post('/', async (request: Request, response: Response) => {
    const project: IProject = request.body;

    try {
        const cretatedProject =await projectsController.addProject(project);
        response.status(201).json(cretatedProject);
    } catch (error) {
        console.error(error);
        response.status(500).json({message: error.message});
    }
});

projectsRouter.delete('/:project_key', async (request: Request, response: Response) => {
    const {project_key} = request.params;

    try {
        await projectsController.deleteProjectByProjectKey(project_key);

        response.status(200).json({message: "project deleted successfully"});
    } catch (error) {
        console.error(error);

        response.status(500).json({error: {message: error.message}});
    }
});

export default projectsRouter;
