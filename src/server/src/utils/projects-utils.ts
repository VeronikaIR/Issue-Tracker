import {IProject} from "../interfaces/projects";

export function parseProjectDtoToIProject(project): IProject {
    return {
        id: project.id,
        project_key: project.project_key,
        name: project.name,
        description: project.description,
        creation_date: project.creation_date,
        lead_user_id: project.lead_user_id
    };
}
