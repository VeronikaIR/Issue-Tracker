class CreateTaskDto {
    constructor(taskKey, title, description, priority, dueDate, status, projectId, assigneeId) {
        this.taskKey = taskKey;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.status = status;
        this.projectId = projectId;
        this.assigneeId = assigneeId;
    }
}

module.exports = CreateTaskDto;