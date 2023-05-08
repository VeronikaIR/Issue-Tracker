const db = require('../../database.js');
const TaskDto = require("../models/response/TaskDto");
class TaskRepository {
    // constructor(db) {
    //     this.db = db;
    // }

    async createTask(task) {
        const query = `
            INSERT INTO tasks (task_key, title, description, priority, due_date, status, project_id, assignee_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [task.taskKey, task.title, task.description,task.priority, task.dueDate, task.status, task.projectId, task.assigneeId];
        const { rows } = await db.pool.query(query, values);

        return new TaskDto(rows[0].id, rows[0].taskKey, rows[0].title, rows[0].description, rows[0].priority, rows[0].dueDate, rows[0].status, rows[0].projectId, rows[0].assigneeId);
    }

    async getTaskById(id) {
        const query = `
      SELECT *
      FROM tasks
      WHERE id = $1
    `;
        const values = [id];
        const { rows } = await db.pool.query(query, values);
        return new TaskDto(rows[0].id, rows[0].taskKey, rows[0].title, rows[0].description, rows[0].priority, rows[0].due_date, rows[0].status, rows[0].projectId, rows[0].assigneeId);
    }

    async updateTaskById(id, task) {
        const query = `
      UPDATE tasks
      SET task_key = $1, title = $2, description = $3, priority = $4, due_date = $5, status = $6, project_id = $7, assignee_id = $8
      WHERE id = $9
      RETURNING *
    `;
        const values = [task.taskKey, task.title, task.description, task.priority, task.dueDate, task.status, task.projectId, task.assigneeId, id];
        const { rows } = await db.pool.query(query, values);
        return new TaskDto(rows[0].id, rows[0].taskKey, rows[0].title, rows[0].description, rows[0].priority, rows[0].dueDate, rows[0].status, rows[0].projectId, rows[0].assigneeId);
    }

    async deleteTaskById(id) {
        const query = `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING *
    `;
        const values = [id];
        const { rows } = await db.pool.query(query, values);
        return new TaskDto(rows[0].id, rows[0].taskKey, rows[0].title, rows[0].description, rows[0].priority, rows[0].dueDate, rows[0].status, rows[0].projectId, rows[0].assigneeId);
    }
}

module.exports = new TaskRepository();
