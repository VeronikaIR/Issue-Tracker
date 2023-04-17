const db = require('../../database.js');
const ProjectDto = require("../models/response/ProjectDto");

class ProjectRepository {
    async create(project) {
        const result = await db.pool.query('INSERT INTO projects (name, description, creation_date, lead_user_id) VALUES ($1, $2, $3, $4) RETURNING *', [project.name, project.description, project.creationDate, project.leadUserId]);
        return new ProjectDto(result.rows[0].id, result.rows[0].name, result.rows[0].description, result.rows[0].creationDate, result.rows[0].leadUserId);
    }

    async findById(id) {
        const result = await db.pool.query('SELECT * FROM projects WHERE id = $1', [id]);
        return new ProjectDto(result.rows[0].id, result.rows[0].name, result.rows[0].description, result.rows[0].creationDate, result.rows[0].leadUserId);
    }

    async findAll() {
        const result = await db.pool.query('SELECT * FROM projects');
        const projects = [];
        result.rows.forEach(row => {
            projects.push(new ProjectDto(row.id, row.name, row.description, row.creationDate, row.leadUserId));
        });
        return projects;
    }

    async update(id, project) {
        const result = await db.pool.query('UPDATE projects SET name = $1, description = $2, creation_date = $3, lead_user_id = $4 WHERE id = $5 RETURNING *', [project.name, project.description, project.creationDate, project.leadUserId, id]);
        return new ProjectDto(result.rows[0].id, result.rows[0].name, result.rows[0].description, result.rows[0].creationDate, result.rows[0].leadUserId);

    }

    async delete(id) {
        const result = await db.pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
        return new ProjectDto(result.rows[0].id, result.rows[0].name, result.rows[0].description, result.rows[0].creationDate, result.rows[0].leadUserId);
    }
}

module.exports = new ProjectRepository();
