class CreateTaskDto {
    constructor(title, description, dueDate, status, projectId, assigneeId) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
        this.projectId = projectId;
        this.assigneeId = assigneeId;
    }
}

module.exports = CreateTaskDto;