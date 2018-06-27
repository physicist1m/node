const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Todo = require('./todoSchema');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('privet'));

const addTodo = (title, done = false) => {
    let myTodo = new Todo({title: title, done: done});
    myTodo.save((err, todo) => {
        if (err) return err;
        return todo;
    })
}

    /*ADD NEW TODO*/

app.post('/todo', (req, res) => { 
    addTodo(req.body.title);
    res.send('new todo: ' + req.body.title );
});

    /*GET ALL TODOS*/

app.get('/todos', (req, res) => {
    Todo.find((err, todos) => {
        if (err) return err;
        res.send(todos);
    });
});
 
    /*GET BY ID*/

app.get('/todos/:id', (req, res) => {
    Todo.findById(req.params.id, 
        (err, todo) => {
            if (err) return err;
            res.send(todo);
        });
});

/*REMOVE BY ID*/

app.delete('/todos/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) return err;
        res.send('removed todo: ' + todo);
    });
});

/*Mark DONE/UNDONE*/

app.put('todos/:id/:done', (req, res) => {
    if(req.params.done) {
        Todo.findByIdAndUpdate(req.params.id, {done: true}, (err, todo) => {
            if (err) return err;
            res.send(todo);
        });
    } else {
        Todo.findByIdAndUpdate(req.params.id, {done: false}, (err, todo) => {
            if (err) return err;
            res.send(todo);
        });
    }
})



app.listen(3000, () => console.log('listening'));