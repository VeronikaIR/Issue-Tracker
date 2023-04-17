const db = require('../../database.js');
const TaskDto = require("../models/response/TaskDto");
class TaskRepository {
    async createTask(task) {
        const query = `
      INSERT INTO tasks (title,description, due_date, status, project_id, assignee_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
        const values = [task.title, task.description, task.dueDate, task.status, task.projectId, task.assigneeId];
        const { rows } = await db.pool.query(query, values);
        return new TaskDto(rows[0].id, rows[0].title, rows[0].description, rows[0].dueDate, rows[0].status, rows[0].projectId, rows[0].assigneeId);
    }

    async getTaskById(id) {
        const query = `
      SELECT * FROM tasks
      WHERE id = $1
    `;
        const values = [id];
        const { rows } = await db.pool.query(query, values);
        return rows[0];
    }

    async updateTaskById(id, task) {
        const result = await db.pool.query(
            'UPDATE tasks SET title = $1, description = $2, due_date = $3, status = $4, project_id = $5, assignee_id = $6  WHERE id = $7 RETURNING *',
            [task.title, task.description, task.dueDate, task.status, task.projectId, task.assigneeId, id]
        );
        return result.rows[0];
    }

    async deleteTaskById(id) {
        const query = `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING *
    `;
        const values = [id];
        const { rows } = await db.pool.query(query, values);
        return rows[0];
    }
}

module.exports = new TaskRepository();
