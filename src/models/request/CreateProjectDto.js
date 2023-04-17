class CreateProjectDto {
    constructor(name, description, creationDate,leadUserId) {
        this.name = name;
        this.description = description;
        this.creationDate =  creationDate;
        this.leadUserId= leadUserId;
    }
}

module.exports = CreateProjectDto;