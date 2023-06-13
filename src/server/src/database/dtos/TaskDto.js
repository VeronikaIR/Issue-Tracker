class TaskDto {
    constructor(id, task_key, title, priority, description, due_date, status, project_id, assignee_id) {
        this.id = id;
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

module.exports = TaskDto;