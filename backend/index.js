const express = require('express')
const app = express()
const port = 4000

const tasks = {}

app.use(express.json()) // JSON parsing first

// ✅ Status route — won't be overridden
app.get('/status', (req, res) => {
  res.send('✅ Backend API is running. Use /tasks to view tasks.');
});

// ✅ Serve frontend React files (this overrides `/`)
app.use(express.static('build'));

app.get('/tasks', (req, res) => {    
  res.send(tasks)
})

app.post('/tasks', (req,res)=>{
  const requestBody = req.body
  tasks[requestBody.task_id] = {}
  tasks[requestBody.task_id].taskName = requestBody.task_name
  tasks[requestBody.task_id].status = "undone"

  res.send(tasks[requestBody.task_id])
})

app.delete('/tasks/:id', (req,res)=>{
  const task_id = req.params.id
  delete tasks[task_id]
  res.send({})
})

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Todo app listening at http://localhost:${port}`)
  console.log('GET    ---   /tasks')
  console.log('POST   ---   /tasks')
  console.log('DELETE ---   /tasks')
  console.log('STATUS ---  /status')
})
