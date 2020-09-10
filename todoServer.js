const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const knex = require('knex');
const cors = require('cors');
const Login = require('./controllers/Login');
const Register = require('./controllers/Register');
const AddTodos = require('./controllers/AddTodos');
const DeleteTodos = require('./controllers/DeleteTodos');
const EditTodos = require('./controllers/EditTodo');
const Index = require('./controllers/index');
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'my password',
    database: 'todolist',
  },
});

const app = express();

app.use(bodyparser.json());

app.use(cors());

//collect all data details
app.post('/schedular', (req, res) => Index(req, res, db));

// Login -> Schedualar(delete/edit/Complete/Uncomplete/) -> Useremail/AddSchedular/EditSchedular //
// //

//Registration
app.post('/register', (req, res) => Register(req, res, bcrypt, db));
//Login
app.post('/login', isLoggedIn, (req, res) => Login(req, res, bcrypt, db));

//add Todo
app.post('/schedular/addTodos', (req, res) => AddTodos(req, res, db));

//delete Todo
app.delete('/schedular/deleteTodos', (req, res) => DeleteTodos(req, res, db));

//edit
app.put('/schedular/editTodos', (req, res) => EditTodos(req, res, db));

//change completion
app.put('/editTodosComplete', (req, res) => {
  const { id, completed } = req.body;
  console.log(id, completed);
  db('todolist')
    .where('id', id)
    .returning('*')
    .update({
      completed: completed,
    })
    .then((data) => res.json(data[0]))
    .catch((err) => res.status(400).json(err));
});

//search for View by completion
// app.post('/showByCompletion',(req,res)=>{
//   const {completed} =req.body;
//   db('todolist').where({
//     completed:completed
//   }).select('*')
//   .then(data=>res.json(data))

// })
// //search for View by currentDate
// app.post('/showByDate',(req,res)=>{
//   const {date} =req.body;
//   db('todolist').where({
//     date
//   }).select('*')
//   .then(data=>res.json(data))
// })
app.listen(3000, () => {
  console.log('app is running on port 3000');
});

function isLoggedIn(req, res, next) {
  const { username, password } = req.body;
  console.log('username', username);
  return next();
}
