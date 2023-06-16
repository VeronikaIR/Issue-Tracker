const db = require('../database');
const UserDto = require("../dtos/UserDto");

class UserRepository {

    async findAllUsers() {
        const query = `
            SELECT *
            FROM users
        `;
        const { rows } = await db.pool.query(query);
        const users = [];
        rows.forEach(row => {
            const createdUser = new UserDto(row.id, row.name, row.email, row.hashed_password);
            users.push(createdUser);
        });
        return users;
    }

    async createUser(user) {
        const query = `
            INSERT INTO users (name, email, hashed_password)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [user.name, user.email, user.hashedPassword];
        const {rows} = await db.pool.query(query, values);
        return new UserDto(rows[0].id, rows[0].name, rows[0].email, rows[0].hashed_password);
    }

    async getUserById(id) {
        const query = `
            SELECT *
            FROM users
            WHERE id = $1
        `;
        const values = [id];
        const {rows} = await db.pool.query(query, values);

        return new UserDto(rows[0].id, rows[0].name, rows[0].email, row[0].hashed_password);
    }

    async updateUserById(id, user) {
        const query = `
            UPDATE users
            SET name            = $1,
                email           = $2,
                hashed_password = $3
            WHERE id = $4
            RETURNING *
        `;
        const values = [user.name, user.email, user.hashedPassword, id];
        const {rows} = await db.pool.query(query, values);

        return new UserDto(rows[0].id, rows[0].name, rows[0].email, row[0].hashed_password);
    }

    async deleteUserById(id) {
        const query = `
            DELETE
            FROM users
            WHERE id = $1
            RETURNING *
        `;
        const values = [id];
        const {rows} = await db.pool.query(query, values);
        return new UserDto(rows[0].id, rows[0].name, rows[0].email, row[0].hashed_password);
    }
}

module.exports = new UserRepository();
