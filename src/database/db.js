// db.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function initDatabase() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            done BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    const taskInsert = await pool.query(
        "SELECT COUNT(*) AS count FROM tasks"
    );

    if (Number(taskInsert.rows[0].count) === 0) {
        await pool.query(
            "INSERT INTO tasks(title, done) VALUES($1, $2)",
            ["Bring Eggs", true]
        );

        await pool.query(
            "INSERT INTO tasks(title, done) VALUES($1, $2)",
            ["Bring Milk", false]
        );

        await pool.query(
            "INSERT INTO tasks(title, done) VALUES($1, $2)",
            ["Bring Bread", false]
        );
    }

    const tasks = await pool.query("SELECT * FROM tasks");
    console.log(tasks.rows);
}

initDatabase().catch((err) => {
    console.error("Database Issue:", err);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};