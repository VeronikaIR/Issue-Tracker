import {IProject} from "../interfaces/projects";
import {parseProjectDtoToIProject} from "../utils/projects-utils";

import {ProjectDto} from '../database/dtos/ProjectDto';
import {TicketController} from "./tickets-controller";

const CreateProjectDto = require('../database/dtos/create/CreateProjectDto')
const ProjectRepository = require('../database/repositories/ProjectRepository.js');

export class ProjectController {
    private projectsCollection: IProject[];

    constructor() {
    }

    public async init() {
        try {
            const projects: ProjectDto[] = await ProjectRepository.findAllProjects();
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


    public async getProjectsData(): Promise<IProject[] | undefined> {
        return this.projectsCollection;
    }

    public async getProjectByProjectKey(project_id: number): Promise<IProject | undefined> {
        const foundProject = await ProjectRepository.getProjectById(project_id);

        console.log(foundProject);
        if (!foundProject) {
            throw new Error("There is no projects with this id found!");
        }

        return parseProjectDtoToIProject(foundProject);
    }

    private async getProjectsByUserId(userId: number): Promise<number[] | undefined> {
        const foundProjects = await ProjectRepository.getAllProjectsByUserId(userId);

        console.log(foundProjects);

        return foundProjects;
    }

    public async getAllProjectsByLeadAndAssignee(userId: number): Promise<IProject[] | undefined> {
        const ticketController = new TicketController();
        await ticketController.init();

        const assigneeProjects = await ticketController.getAllProjectsByAssigneeId(Number(userId));
        const leadProjects = await this.getProjectsByUserId(Number(userId));

        console.log('12345');
        let concatenatedArray: number[] = [];
        assigneeProjects.forEach(assigneeProject =>{
            concatenatedArray.push(assigneeProject);
        })
        leadProjects.forEach(leadProject=>{
            concatenatedArray.push(leadProject);
        })

        console.log(concatenatedArray);
        const foundProjects = await ProjectRepository.getAllProjectsFromList(concatenatedArray);
        console.log("Found projects: \n");
        console.log(foundProjects);

        return foundProjects.map((project) => {
            console.log("Before: ");
            console.log(project);
            const parsedProject = parseProjectDtoToIProject(project);
            console.log("Parsed:");
            console.log(parsedProject);
            return parsedProject;
        });
    }


    public async addProject(project: IProject): Promise<IProject | undefined> {
        console.log(project);

        const newProject = new CreateProjectDto(project.name, project.description, project.creationDate, project.leadUserId);
        console.log(newProject);
        const createTicket: ProjectDto = await ProjectRepository.createProject(newProject);
        console.log("Successfully created project" + createTicket);
        return parseProjectDtoToIProject(createTicket);
    };

    public async deleteProjectByProjectKey(project_num: string): Promise<void> {
        const deleteProject: ProjectDto = await ProjectRepository.deleteProjectById(project_num);
        console.log("Delete project is: \n" + deleteProject);
    };

}
