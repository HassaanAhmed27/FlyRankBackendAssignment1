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
router.get("/tasks", (req, res) => {
    const tasks = db.prepare("SELECT * FROM tasks").all();
    res.status(200).json(tasks);
});

// GET task by ID (Live from SQLite)
router.get("/tasks/:id", (req, res) => {
    const task = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(req.params.id);

    if (!task) {
        return res
            .status(404)
            .json({ error: `Task ${req.params.id} not found` });
    }

    res.status(200).json(task);
});


const memorylist = db.prepare("SELECT * FROM tasks").all();

router.post("/tasks", (req, res) => {
    const task = req.body;
    const newTask=db;

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
        "UPDATE tasks SET title = ?, done = ? WHERE id = ?"
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
module.exports = router;