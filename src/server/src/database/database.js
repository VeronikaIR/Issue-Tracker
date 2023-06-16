const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// create a new Pool instance with your database connection details
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin123',
    port: '5432',
});

async function loadMigrations() {

    // get all migration files from the migrations directory
    const migrationDir = path.join(__dirname, './migrations');
    const migrationFiles = fs.readdirSync(migrationDir);

    // sort the migration files by their timestamp prefix
    const sortedMigrationFiles = migrationFiles.sort((a, b) => {
        const aTimestamp = parseInt(a.split('_')[0]);
        const bTimestamp = parseInt(b.split('_')[0]);
        return aTimestamp - bTimestamp;
    });

    // execute each migration file in sequence
    for (const migrationFile of sortedMigrationFiles) {
        const migrationFilePath = path.join(migrationDir, migrationFile);
        const migrationFileContents = fs.readFileSync(migrationFilePath, 'utf-8');
        console.log(`Executing migration file: ${migrationFile}`);
        await pool.query(migrationFileContents);
    }
}

module.exports = { loadMigrations, pool};
