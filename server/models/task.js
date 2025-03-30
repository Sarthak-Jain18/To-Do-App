// Database models/schema
const mongoose = require('mongoose');
const { title } = require('process');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: { 
        type: String, 
        enum: ["Completed", "In Progress", "Pending"],
        default: "Pending"
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
})

const task = mongoose.model("task",taskSchema);
module.exports = task;