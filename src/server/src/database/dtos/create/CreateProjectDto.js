class CreateProjectDto {
    constructor(project_key ,name, description, creationDate,leadUserId) {
        this.project_key = project_key;
        this.name = name;
        this.description = description;
        this.creationDate =  creationDate;
        this.leadUserId= leadUserId;
    }
}

module.exports = CreateProjectDto;