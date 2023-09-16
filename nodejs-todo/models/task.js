const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({

    title : {
        type:String,
        required:true
    },

    disc : {
        type:String,
        required:true
    },

    status : {
        type:String,
        required:true
    },
});


const task = new mongoose.model("task", taskSchema);

module.exports = task;