import {IProject} from "../interfaces/projects";

export function parseProjectDtoToIProject(project): IProject {
    return {
        id: project.id,
        name: project.name,
        description: project.description,
        creationDate: project.creationDate,
        leadUserId: project.leadUserId
    };
}
