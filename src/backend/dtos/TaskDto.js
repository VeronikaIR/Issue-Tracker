class TaskDto {
    constructor(id, taskKey, title, priority, description, dueDate, status, projectId, assigneeId) {
        this.id = id;
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

module.exports = TaskDto;