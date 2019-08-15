const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.use(express.static('public'))

//placeholders for adde task
let task: string[] = []
//placeholders for complete task
let complete: string[] = []
//placeholders for recyle bin
var recyle

//render the ejs and display added task, completed task
app.get('/', (req, res) => {
  res.render('index', { task: task, complete: complete })
})

//post route for adding new task
app.post('/addtask', (req, res) => {
  var newTask: string = req.body.newtask
  task.push(newTask)
  res.redirect('/')
})

app.post('/complete', (req, res) => {
  var completeTask: string = req.body.check
  //check for the "typeof" the different completed task, then add into the complete task
  if (typeof completeTask === 'string') {
    complete.push(completeTask)
    //check if the completed task already exits in the task when checked, then remove it
    task.splice(task.indexOf(completeTask), 1)
  }
  res.redirect('/')
})

//this function is used to delete a temporary string
app.post('/removewhile', (req, res) => {
  var completeTask: string = req.body.check
  if (typeof completeTask === 'string') {
    recyle = task.splice(task.indexOf(completeTask), 1)
  }
  res.redirect('/')
})

//This function is used to return a temporary deleted string value
app.post('/undo', (req, res) => {
  if (recyle != null) {
    task.push(recyle)
    recyle = null
  }
  res.redirect('/')
})

//This function is used to clear the value in a complete array
app.post('/reset', (req, res) => {
  complete = []
  res.redirect('/')
})

app.listen(2201, () => {
  console.log('server is running on port 2201')
})
