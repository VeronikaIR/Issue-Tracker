class CreateProjectDto {
    constructor(projectKey ,name, description, creationDate,leadUserId) {
        this.projectKey = projectKey;
        this.name = name;
        this.description = description;
        this.creationDate =  creationDate;
        this.leadUserId= leadUserId;
    }
}

module.exports = CreateProjectDto;