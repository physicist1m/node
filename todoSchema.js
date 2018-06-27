const mongoose = require('mongoose');


const todoSchema = mongoose.Schema({
    title: String,
    done: Boolean
});


const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;