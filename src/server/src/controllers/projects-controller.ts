import { IProject, IProjectData} from "../interfaces/projects";
import { readFile, write } from "../utils/file-utils";
// import { DataBase } from '../db/index';
// import { MongoClient } from "mongodb";

const projectsJSON: string = 'resources/projects.json';
const projectsCollection = 'projects';

export class ProjectsController {
    private projectsData: IProjectData;
    private projectsCollection;

    constructor() {}

    public async init() {
        // try {
        //     const db = await new DataBase().connectDB();
        //     this.projectsCollection = await db.collection('projects');
        // } catch (error) {
        //     console.error(error);
        // }

        const projectsData = await readFile(projectsJSON);
        this.projectsData = JSON.parse(projectsData);
    }

    public async getProjectsData(): Promise<IProjectData> {
        //return this.projectsCollection.find({});
        return this.projectsData;
    }

    public async getProjectByProjectKey(project_key: number): Promise<IProject | undefined> {
        //const project = await this.projectsCollection.findOne({ fn });
        const project = this.projectsData.projects.filter(project => project.project_key === project_key)

        return project[0];
    }

    // public async addProject(project: IProject): Promise<void> {
    //     project.project_key = Number(project.project_key);
    //     project.name = project.name;
        
    //     //this.projectsCollection.insertOne(project);

    //     this.projectsData.projects.push(project);

    //     await this.saveprojectsData();
    // }

    // public async deleteprojectByProjectKey(project_num: number): Promise<void> {
    //    // this.projectsCollection.deleteOne({ project_key: project_num });

    //     const updatedProjects = this.projectsData.projects.filter(project => project.project_key !== project_num);
    //     this.projectsData.projects = updatedProjects;
    //     await write(projectsJSON, JSON.stringify(this.projectsData));
    // }

    private async saveprojectsData(): Promise<void> {
        await write(projectsJSON, JSON.stringify(this.projectsData));
    }
}