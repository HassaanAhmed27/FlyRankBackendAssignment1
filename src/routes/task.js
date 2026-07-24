const { Router } = require("express");
const router = Router();
const db = require("../database/db.js");

// Root endpoint
router.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});

// Health check
router.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// GET all tasks (Live from SQLite)
router.get("/tasks", async  (req, res) => {
    const { search, done } = req.query;

    let query = "SELECT * FROM tasks";
    const params = [];
    const conditions = [];

    if (search) {
        params.push(`%${search}%`);
        conditions.push(`title ILIKE $${params.length}`);
        
    }

    if (done !== undefined) {
       params.push(done==="true");
       conditions.push(`done = $${params.length}`);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    const result =await db.query(query,params);
    const tasks =result.rows;
    if (tasks.length === 0) {
        return res.status(404).json({
            error: "No matching tasks found"
        });
    }

    res.status(200).json(tasks);
});


// GET task by ID (Live from SQLite)
router.get("/tasks/:id", async (req, res) => {
    const tid=req.params.id
    const task =await db.query("SELECT * FROM tasks WHERE id = $1",[tid])


    if (task.rows.length === 0) {
    return res.status(404).json({
        error: "Task not found"
    });
}

    res.status(200).json(task.rows[0]);
});



// const reslt = await db.query("SELECT * FROM tasks");
// const memorylist=reslt.rows;

router.post("/tasks", (req, res) => {
    const task = req.body;
    const newTask = db;

    if (!task.id) {
        task.id = `${memorylist.length + 1}`;
    }

    if (!task.title || task.title.trim() === "") {
        return res.status(400).json({
            error: "Task title is required"
        });
    }

    if (task.done === undefined) {
        task.done = false;
    }
    const insert = db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)");
    insert.run(task.title, task.done);

    memorylist.push(task);

    res.status(201).json(task);
});

router.put("/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    const taskFromUser = req.body;

    if (
        Object.keys(taskFromUser).length === 0 ||
        ("title" in taskFromUser &&
            (!taskFromUser.title || taskFromUser.title.trim() === ""))
    ) {
        return res.status(400).json({
            error: "Invalid request body"
        });
    }

    const task = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(taskId);

    if (!task) {
        return res.status(404).json({
            error: `Task ${taskId} not found`
        });
    }

    db.prepare(
        "UPDATE tasks SET title = ?, done = ?,updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).run(
        taskFromUser.title ?? task.title,
        taskFromUser.done ?? task.done,
        taskId
    );

    const updatedTask = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(taskId);

    res.status(204);
});

router.delete("/tasks/:id", (req, res) => {
    const taskId = req.params.id;

    const task = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(taskId);

    if (!task) {
        return res.status(404).json({
            error: `Task ${taskId} not found`
        });
    }

    db.prepare(
        "DELETE FROM tasks WHERE id = ?"
    ).run(taskId);

    const updatedTask = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(taskId);

    return res.status(204).json({
        message: `Task ${taskId} deleted successfully`
    });
});

router.get('/stats', (req, res) => {
    const stats = db.prepare(`
        SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN done = 1 THEN 1 ELSE 0 END) AS completed,
            SUM(CASE WHEN done = 0 THEN 1 ELSE 0 END) AS pending
        FROM tasks
    `).get();

    res.status(200).json(stats);
});

module.exports = router;