class ProjectDto {
    constructor(id, project_key, name, description, creation_date, lead_user_id) {
        this.id = id;
        this.project_key = project_key;
        this.name = name;
        this.description = description;
        this.creation_date =  creation_date;
        this.lead_user_id = lead_user_id;
    }
}

module.exports = ProjectDto;