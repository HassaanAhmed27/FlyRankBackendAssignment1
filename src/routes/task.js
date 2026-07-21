const { Router } = require("express");
const router = Router();

const memorylist = [
    { id: '1', title: "Stage 2 task", done: true },
    { id: '2', title: "Stage 2 task1", done: false },
    { id: '3', title: "Stage 2 task2", done: true }
];

router.get('/', (req, res) => {
    res.json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] });
});

router.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

router.get('/tasks', (req, res) => {
    res.json(memorylist);
});

router.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;

    for (let task of memorylist) {
        if (task.id == taskId) {
            return res.status(200).json(task);
        }
    }

    return res.status(404).json({ error: `Task ${taskId} not found` });
});

router.post('/tasks', (req, res) => {
    const task = req.body;

    if (!task.id) {
        task.id = `${memorylist.length + 1}`;
    }

    if (!task.title || task.title.trim() === "") {
        return res.status(400).json({ error: "Task title is required" });
    }

    if (task.done === undefined) {
        task.done = false;
    }

    memorylist.push(task);

    res.status(201).json(task);
});

router.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const taskFromUser = req.body;

    if (
        Object.keys(taskFromUser).length === 0 ||
        ("title" in taskFromUser &&
            (!taskFromUser.title || taskFromUser.title.trim() === ""))
    ) {
        return res.status(400).json({ error: "Invalid request body" });
    }

    for (let task of memorylist) {
        if (task.id == taskId) {
            const index = memorylist.indexOf(task);

            memorylist[index] = {
                ...memorylist[index],
                ...taskFromUser
            };

            return res.status(200).json(task);
        }
    }

    return res.status(404).json({ error: `Task ${taskId} not found` });
});

router.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = req.body;

    for (let task of memorylist) {
        if (task.id == taskId) {
            const index = memorylist.indexOf(task);

            memorylist.splice(index, 1);

            return res.sendStatus(204);
        }
    }

    return res.status(404).json({ error: `Task ${taskId} not found` });
});

module.exports = router;