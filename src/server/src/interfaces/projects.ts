export interface IProject {
    id: number,
    project_key: string,
    name: string,
    description: string,
    creation_date: Date,
    lead_user_id: number
};

export interface IProjectData {
    projects: IProject[];
};
