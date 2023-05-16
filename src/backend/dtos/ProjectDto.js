class ProjectDto {
    constructor(id, projectKey, name, description, creationDate, leadUserId) {
        this.id = id;
        this.projectKey = projectKey;
        this.name = name;
        this.description = description;
        this.creationDate =  creationDate;
        this.leadUserId = leadUserId;
    }
}

module.exports = ProjectDto;