const express = require("express");
const app = express();

const taskRoutes = require("./src/routes/task");

app.use(express.json());

app.use("/", taskRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});