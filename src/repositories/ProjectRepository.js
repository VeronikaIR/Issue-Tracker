const db = require('../../database.js');
const ProjectDto = require("../models/response/ProjectDto");

class ProjectRepository {
    async create(project) {
        const query = `
            INSERT INTO projects (project_key, name, description, creation_date, lead_user_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [project.projectKey, project.name, project.description, project.creationDate, project.leadUserId];
        const { rows } = await db.pool.query(query, values);
        return new ProjectDto(rows[0].id, rows[0].projectKey, rows[0].name, rows[0].description, rows[0].creationDate, rows[0].leadUserId);
    }

    async findById(id) {
        const query = `
            SELECT *
            FROM projects
            WHERE id = $1
        `;
        const values = [id];
        const { rows } = await db.pool.query(query, values);
        return new ProjectDto(rows[0].id, rows[0].projectKey, rows[0].name, rows[0].description, rows[0].creationDate, rows[0].leadUserId);
    }

    async findAll() {
        const query = `
            SELECT *
            FROM projects
        `;
        const { rows } = await db.pool.query(query);
        const projects = [];
        rows.forEach(row => {
            projects.push(new ProjectDto(row.id, row.projectKey, row.name, row.description, row.creationDate, row.leadUserId));
        });
        return projects;
    }

    async update(id, project) {
        const query = `
            UPDATE projects
            SET name = $1, description = $2, creation_date = $3, lead_user_id = $4
            WHERE id = $5
            RETURNING *
        `;
        const values = [project.name, project.description, project.creationDate, project.leadUserId, id];
        const { rows } = await db.pool.query(query, values);
        return new ProjectDto(rows[0].id, rows[0].projectKey, rows[0].name, rows[0].description, rows[0].creationDate, rows[0].leadUserId);
    }

    async delete(id) {
        const query = `
            DELETE
            FROM projects
            WHERE id = $1
            RETURNING *
        `;
        const values = [id];
        const { rows } = await db.pool.query(query, values);
        return new ProjectDto(rows[0].id, rows[0].projectKey, rows[0].name, rows[0].description, rows[0].creationDate, rows[0].leadUserId);
    }
}


module.exports = new ProjectRepository();
