// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function initDatabase() {



    await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY ,
        title TEXT NOT NULL,
        done BOOLEAN DEFAULT FALSE,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
`);

    const taskInsert =await pool.query(
        `select count(*) as count from tasks`
    );

    if (Number(taskInsert.rows[0].count()===0)) {
    await pool.query(`
        insert into tasks( title,done) values( $1, $2)`,
        ["Bring Eggs", true]
    )
    await pool.query(`
        insert into tasks( title,done) values( $1, $2)`,
        ["Bring Milk", false]
    )
    await pool.query(`
        insert into tasks( title,done) values( $1, $2)`,
        ["Bring Bread", false]
    )
    }
    const tasks = pool.query("SELECT * FROM tasks");
    console.log(tasks);
}
initDatabase().catch(err => {console.log("Database Isuse",err)})
module.exports = {
    query: (text, params) => pool.query(text, params),
    pool // Exported if you ever need to manually close the pool later
};