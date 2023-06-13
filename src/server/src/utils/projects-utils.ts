import {IProject} from "../interfaces/projects";

export function parseProjectDtoToIProject(project): IProject {
    return {
        id: project.id,
        project_key: project.projectKey,
        name: project.name,
        description: project.description,
        creation_date: project.creationDate,
        lead_user_id: project.leadUserId
    };
}
