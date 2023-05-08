const db = require('../../database');
const UserDto = require("../models/response/UserDto");

class UserRepository {
    async createUser(user) {
        const query = `
            INSERT INTO users (name, email, hashed_password)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [user.name, user.email, user.hashedPassword];
        const {rows} = await db.pool.query(query, values);

        return new UserDto(rows[0].id, rows[0].name, rows[0].email);
    }

    async getUserById(id) {
        const query = `
            SELECT *
            FROM users
            WHERE id = $1
        `;
        const values = [id];
        const {rows} = await db.pool.query(query, values);
        return new UserDto(rows[0].id, rows[0].name, rows[0].email);
    }

    async updateUserById(id, user) {
        const result = await db.pool.query(
            'UPDATE users SET name = $1, email = $2, hashed_password = $3 WHERE id = $4 RETURNING *',
            [user.name, user.email, user.hashedPassword, id]
        );
        return new UserDto(result.rows[0].id, result.rows[0].name, result.rows[0].email);
    }

    async deleteUserById(id) {
        const query = `
            DELETE
            FROM users
            WHERE id = $1
            RETURNING *
        `;
        const values = [id];
        const { rows } = await db.pool.query(query, values);
        return new UserDto(rows[0].id, rows[0].name, rows[0].email);
    }
}

module.exports = new UserRepository();
