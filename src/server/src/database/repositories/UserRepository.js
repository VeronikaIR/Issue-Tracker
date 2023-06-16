const db = require('../dataBaseConfig/database');
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
    
    // //register
    // async checkIfUserExists(username) {
    //     const query = `
    //         SELECT *
    //         FROM users
    //         WHERE name = $1
    //     `;
    //     const values = [username];
    //     const {rows} = await db.pool.query(query, values);

    //     return rows.length > 0 ? true : false;
    // }
    
    //login
    // async validateUser(username,password){
    //     const query = `
    //         SELECT *
    //         FROM users
    //         WHERE name = $1 AND
    //         hashed_password = $2
    //     `;

    //     let hashedPassword= "";
    //     bcrypt.genSalt(15, function(err, salt) {
    //         bcrypt.hash(password, salt, function(err, hash) {
    //             hashedPassword = hash;
    //         });
    //     });

    //     const values = [username,hashedPassword];
    //     const {rows} = await db.pool.query(query, values);

    //     return rows.length > 0 ? true : false;
    // }

    async getUserById(id) {
        const query = `
            SELECT *
            FROM users
            WHERE id = $1
        `;
        const values = [id];
        const {rows} = await db.pool.query(query, values);

        return new UserDto(rows[0].id, rows[0].name, rows[0].email, rows[0].hashed_password);
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

        return new UserDto(rows[0].id, rows[0].name, rows[0].email, rows[0].hashed_password);
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
        return new UserDto(rows[0].id, rows[0].name, rows[0].email, rows[0].hashed_password);
    }
}

module.export = new UserRepository();
