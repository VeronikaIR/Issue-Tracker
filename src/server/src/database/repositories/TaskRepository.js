const db = require('../database');
const TaskDto = require("../dtos/TaskDto");
const ProjectDto = require("../dtos/ProjectDto");
class TaskRepository {

    async findAllTasks() {
        const query = `
            SELECT *
            FROM tasks
        `;
        const { rows } = await db.pool.query(query);
        const tasks = [];
        rows.forEach(row => {
            const task = new  TaskDto(row.id, row.title, row.description, row.priority, row.due_date, row.status, row.project_id, row.assignee_id);
            tasks.push(task);
        });
        return tasks;
    }

    async  getAllTasksByProjectId(projectId) {
        const query = `
            SELECT *
            FROM tasks
            WHERE project_id = $1
        `;
        const values = [projectId];
        const { rows } = await db.pool.query(query, values);

        const tasks = rows.map(row => {
            return new TaskDto(row.id, row.title, row.description, row.priority, row.due_date, row.status, row.project_id, row.assignee_id);
        });

        return tasks;
    }

    async createTask(task) {
        const query = `
            INSERT INTO tasks (title, description, priority, due_date, status, project_id, assignee_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const values = [task.title, task.description,task.priority, task.dueDate, task.status, task.projectId, task.assigneeId];
        const { rows } = await db.pool.query(query, values);

        return new TaskDto(rows[0].id, rows[0].title, rows[0].description, rows[0].priority, rows[0].due_date, rows[0].status, rows[0].project_id, rows[0].assignee_id);
    }

    async getTaskById(id) {
        const query = `
          SELECT *
          FROM tasks
          WHERE id = $1
    `;
        const values = [id];
        const { rows } = await db.pool.query(query, values);

        return new TaskDto(rows[0].id, rows[0].title, rows[0].description, rows[0].priority, rows[0].due_date, rows[0].status, rows[0].project_id, rows[0].assignee_id);
    }

    async updateTaskById(id, task) {
        const query = `
          UPDATE tasks
          SET title = $1, description = $2, priority = $3, due_date = $4, status = $5, project_id = $6, assignee_id = $7
          WHERE id = $8
          RETURNING *
    `;
        const values = [task.title, task.description, task.priority, task.dueDate, task.status, task.projectId, task.assigneeId, id];
        const { rows } = await db.pool.query(query, values);
        return new TaskDto(rows[0].id, rows[0].title, rows[0].description, rows[0].priority, rows[0].due_date, rows[0].status, rows[0].project_id, rows[0].assignee_id);
    }

    async deleteTaskById(id) {
        const query = `
            DELETE
            FROM tasks
            WHERE id = $1
                RETURNING *
        `;
        const values = [id];
        const { rows } = await db.pool.query(query, values);
        return new TaskDto(rows[0].id, rows[0].title, rows[0].description, rows[0].priority, rows[0].due_date, rows[0].status, rows[0].project_id, rows[0].assignee_id);
    }
}

module.exports = new TaskRepository();
