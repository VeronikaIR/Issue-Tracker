class ProjectDto {
    constructor(id,name, description, creationDate, leadUserId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.creationDate =  creationDate;
        this.leadUserId = leadUserId;
    }
}

module.exports = ProjectDto;