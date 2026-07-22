const path = require("path");
const Database = require("better-sqlite3");
const db = new Database(
    path.join(__dirname, "../SQLITE/task.db")
);
db.exec(`
    create table if not exists tasks (
        id integer primary key autoincrement,
        title text not null,
        done boolean 
    );
`)

const taskInsert=db.prepare(`select count(*) as count from tasks`);
if(taskInsert.get().count===0){
   const insert= db.prepare(`
        insert into tasks( title,done) values( ?, ?);
    `)
    insert.run("Bring Eggs", 1);
    insert.run("Bring Milk", 0);
    insert.run("Bring Bread"   , 0);
}
const tasks = db.prepare("SELECT * FROM tasks").all();
console.log(tasks);
module.exports = db;