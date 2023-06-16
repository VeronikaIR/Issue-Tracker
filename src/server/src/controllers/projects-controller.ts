import { IProject} from "../interfaces/projects";
import {parseProjectDtoToIProject} from "../utils/projects-utils";
import {ITicket} from "../interfaces/tickets";
import {parseTaskDtoToITicket} from "../utils/tickets-utils";

import {ProjectDto} from '../database/dtos/ProjectDto';
const CreateProjectDto = require('../database/dtos/create/CreateProjectDto')
const ProjectRepository = require('../database/repositories/ProjectRepository');

export class ProjectController {
    private projectsCollection: IProject[];

    constructor() {}

    public async init() {
        try {
            const projects: IProject[] = await ProjectRepository.findAllProjects();
            console.log(projects);
            this.projectsCollection = projects.map((project) => {
                console.log("Before: ");
                console.log(project);
                const parsedProject = parseProjectDtoToIProject(project);
                console.log("Parsed:");
                console.log(parsedProject);
                return parsedProject;
            });
        } catch (error) {
            console.error(error);
        }
    };


    public async getProjectsData(): Promise<IProject[]> {
       return this.projectsCollection;
    }

    public async getProjectByProjectKey(project_id: number): Promise<IProject | undefined> {
        const foundProject = await ProjectRepository.getProjectById(project_id);

        console.log(foundProject);

        return parseProjectDtoToIProject(foundProject);
    }

    public async addProject (project: IProject): Promise<IProject | undefined> {
        console.log(project);

        const newProject = new CreateProjectDto(project.projectKey, project.name, project.description, project.creationDate, project.leadUserId);
        console.log(newProject);
        const createTicket: ProjectDto = await ProjectRepository.createProject(newProject);
        console.log("Successfully created ticket" + createTicket);
        return parseProjectDtoToIProject(createTicket);
    };

    public async deleteProjectByProjectKey(project_num: string): Promise<void> {
        const deleteProject:ProjectDto = await ProjectRepository.deleteProjectById(project_num);
        console.log("Delete project is: \n" + deleteProject);
    };

}
