const express = require('express');
const app = express();
const port = 3000;

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");

// app.get('/', (req, res) => {
//   res.send('Stage 0: hello server');
// });

app.use(express.json()); 
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const memorylist=[
   {id:'1',title:"Stage 2 task",done: true},
   {id:'2',title:"Stage 2 task1",done: false},
   {id:'3',title:"Stage 2 task2",done: true}
]
app.get('/', (req, res) => {
  res.json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] });
});

app.get('/health', (req, res) => {
  res.json({ status:"ok"});
});

app.get('/tasks', (req, res) => {
  res.json(memorylist);
});
app.get('/tasks/:id', (req, res) => {
 const taskId = req.params.id;
 for(let task of memorylist){
    if(task.id==taskId){
        return res.status(201).json(task);
    }
 }
  return res.status(404).json({error:`Task ${taskId} not found`});
});

app.post('/tasks',(req,res)=>{
    const task =req.body;
    if(!task.id){
        task.id = `${memorylist.length + 1}`;
    }
    if(!task.title){
        res.status(400).json({error:"Task title is required"});
    }
    if(!task.done){
        task.done=false;
    }

    memorylist.push(task);
    res.status(200).json(task);
})

app.put('/tasks/:id',(req,res)=>{
    const taskId =req.params.id;
    const taskFromUser =req.body;
    for(let task of memorylist){
        if(task.id==taskId){
            const index=memorylist.indexOf(task);
            memorylist[index]={
                ...memorylist[index],
                ...taskFromUser
            }

            return res.status(204).json(task);
        }
    }
    return res.status(404).json({error:`Task ${taskId} not found`});
})
app.delete('/tasks/:id',(req,res)=>{
    const taskId =req.params.id;
    const task =req.body;
    for(let task of memorylist){
        if(task.id==taskId){
            const index=memorylist.indexOf(task);
            memorylist.splice(index,1);
            return res.status(204).json(task);
        }
    }
    return res.status(404).json({error:`Task ${taskId} not found`});
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});