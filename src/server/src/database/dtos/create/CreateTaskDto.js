class CreateTaskDto {
    constructor(task_key, title, description, priority, due_date, status, project_id, assignee_id) {
        this.task_key = task_key;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.due_date = due_date;
        this.status = status;
        this.project_id = project_id;
        this.assignee_id = assignee_id;
    }
}

module.exports = CreateTaskDto;