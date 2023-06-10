export interface IProject {
    project_key: Number,
    name: string,
    description: string,
    creation_date: Date,
    status: string,
    lead_user_id: Number
};

export interface IProjectData {
    projects: IProject[];
};
