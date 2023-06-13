import {Router, Request, Response} from 'express';
import { ProjectsController } from '../controllers/projects-controller';
import {IProject} from "../interfaces/projects";

const projectsRouter: Router = Router();

//TODO: remove this after addind the db
const projectsJSON: string = 'resources/projects.json';

let projectsController: ProjectsController;

const getProjectsController = async (req: Request, res: Response, next: () => void) => {
    try {
        projectsController = new ProjectsController();
        console.log('Controller initialization...')
        await projectsController.init();
        console.log('Initialized constroller')
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
};

projectsRouter.use(getProjectsController);

projectsRouter.get('/', async (request: Request, response: Response) => {
    try {
        const projects = await projectsController.getProjectsData();
        response.status(200).json(projects);
    } catch (error) {
        console.error(error);
        response.status(500).json('Internal server error');
    }
});

projectsRouter.get('/:project_key', async (request: Request, response: Response) => {
    const {project_key} = request.params;

    try {
        const project = await projectsController.getProjectByProjectKey(Number(project_key));

        if (project) {
            response.status(200).json(project);
        } else {
            response.status(404).json({message: "project not found"});
        }
    } catch (error) {
        console.error(error);
        response.status(500).json('Internal server error');
    }
});

projectsRouter.post('/', async (request: Request, response: Response) => {
    const project: IProject = request.body;

    try {
        await projectsController.addProject(project);
        response.status(201).json({message: "project added successfully"});
    } catch (error) {
        console.error(error);
        response.status(500).json({error: "Internal server error"});
    }
});

// projectsRouter.put('/:project_key', async (request: Request, response: Response) => {
//     const {project_key} = request.params;
//     const projectData = request.body;
//
//     try {
//         const projects = await read(projectsJSON);
//         const parsedprojects = JSON.parse(projects);
//
//         const updatedprojects = parsedprojects.projects.map(project => {
//             if (project.project_key === Number(project_key)) {
//                 return projectData;
//             }
//
//             return project;
//         });
//
//         parsedprojects.projects = updatedprojects;
//
//         await write(projectsJSON, JSON.stringify(parsedprojects));
//
//         response.status(200).json({message: 'project updated successfully'});
//     } catch (error) {
//         console.error(error);
//         response.status(500).json({error: 'Internal server error'});
//     }
// });

// projectsRouter.patch('/:project_key', async (request: Request, response: Response) => {
//     const {project_key} = request.params;
//     const {title_param} = request.body;
//
//     try {
//         const projects = await read(projectsJSON);
//         const parsedprojects = JSON.parse(projects);
//
//         const updatedprojects = parsedprojects.projects.map(project => {
//             if (project.project_key === Number(project_key)) {
//                 project.title = title_param;
//             }
//
//             return project;
//         });
//
//         parsedprojects.projects = updatedprojects;
//
//         await write(projectsJSON, JSON.stringify(parsedprojects));
//
//         response.status(200).json({message: 'project updated successfully'});
//     } catch (error) {
//         console.error(error);
//
//         response.status(500).json({error: 'Internal server error'});
//     }
// });

projectsRouter.delete('/:project_key', async (request: Request, response: Response) => {
    const {project_key} = request.params;

    try {
        await projectsController.deleteprojectByProjectKey(Number(project_key));

        response.status(200).json({message: "project deleted successfully"});
    } catch (error) {
        console.error(error);

        response.status(500).json({error: 'Internal server error'});
    }
});

export default projectsRouter;
