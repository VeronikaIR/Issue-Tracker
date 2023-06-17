const db = require('../database');
const ProjectDto = require("../dtos/ProjectDto");
const TaskDto = require("../dtos/TaskDto");

class ProjectRepository {
    async createProject(project) {
        const query = `
            INSERT INTO projects (name, description, creation_date, lead_user_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [project.name, project.description, project.creationDate, project.leadUserId];
        const { rows } = await db.pool.query(query, values);

        return new ProjectDto(rows[0].id, rows[0].name, rows[0].description, rows[0].creation_date, rows[0].lead_user_id);
    }



    async getProjectById(id) {
        const query = `
            SELECT *
            FROM projects
            WHERE id = $1
        `;
        const values = [id];
        const { rows } = await db.pool.query(query, values);
        return new ProjectDto(rows[0].id, rows[0].name, rows[0].description, rows[0].creation_date, rows[0].lead_user_id);
    }

    async findAllProjects() {
        const query = `
            SELECT *
            FROM projects
        `;
        const { rows } = await db.pool.query(query);
        const projects = [];
        rows.forEach(row => {
            const project = new ProjectDto(row.id, row.name, row.description, row.creation_date, row.lead_user_id);
            projects.push(project);
        });
        return projects;
    }

    async getAllProjectsByUserId(userId) {
        const query = `
            SELECT *
            FROM projects
            WHERE lead_user_id = $1
        `;
        const values = [userId];
        const {rows} = await db.pool.query(query, values);

        return rows.map(row => {
            return new ProjectDto(row.id, row.name, row.description, row.creation_date, row.lead_user_id);
        });
    }

    async updateProjectById(id, project) {
        const query = `
            UPDATE projects
            SET name = $1, description = $2, creation_date = $3, lead_user_id = $4
            WHERE id = $5
            RETURNING *
        `;
        const values = [project.name, project.description, project.creationDate, project.leadUserId , id];
        const { rows } = await db.pool.query(query, values);

        return new ProjectDto(rows[0].id, rows[0].name, rows[0].description, rows[0].creation_date, rows[0].lead_user_id);
    }

    async deleteProjectById(id) {
        const query = `
            DELETE
            FROM projects
            WHERE id = $1
                RETURNING *
        `;
        const values = [id];
        const { rows } = await db.pool.query(query, values);
        return new ProjectDto(rows[0].id, rows[0].name, rows[0].description, rows[0].creation_date, rows[0].lead_user_id);
    }
}


module.exports = new ProjectRepository();
