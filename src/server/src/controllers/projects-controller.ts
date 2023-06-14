import { IProject} from "../interfaces/projects";
import {parseProjectDtoToIProject} from "../utils/projects-utils";

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

}
