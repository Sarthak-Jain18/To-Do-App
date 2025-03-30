// Initial Database

// MONGOOSE
const mongoose = require('mongoose');
const dbURI = process.env.MONGO_URI;
main()
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB Connection Error:", err));
async function main() {
    await mongoose.connect(dbURI);
}

// MODEL
const task = require("./models/task.js");
const { title } = require('process');
 
let allTasks = [
    {
        title: "DSA",
        description: "Do LeetCode Two Sum",
        status: "Pending",
        startTime: "8 AM",
        endTime: "11 AM"
    },
    {
        title: "Math",
        description: "Practice calculus problems",
        status: "Completed",
        startTime: "11 AM",
        endTime: "12 AM"
    },
    {
        title: "Coding",
        description: "Build a simple REST API with Express",
        status: "Pending",
        startTime: "2 PM",
        endTime: "4 PM"
    },
    {
        title: "Reading",
        description: "Read 20 pages of a programming book",
        status: "Pending",
        startTime: "6 PM",
        endTime: "7 PM"
    },
    {
        title: "Workout",
        description: "Do a 30-minute HIIT session",
        status: "In Progress",
        startTime: "7 PM",
        endTime: "7:30 PM"
    },
    {
        title: "Meditation",
        description: "Practice mindfulness meditation for 15 minutes",
        status: "Pending",
        startTime: "7:30 AM",
        endTime: "7:45 AM"
    },
    {
        title: "Project Work",
        description: "Work on the JavaScript project",
        status: "In Progress",
        startTime: "10 AM",
        endTime: "12 PM"
    },
    {
        title: "Cooking",
        description: "Prepare and eat a healthy meal",
        status: "Completed",
        startTime: "12 PM",
        endTime: "1 PM"
    },
    {
        title: "Music",
        description: "Practice guitar for 30 minutes",
        status: "Pending",
        startTime: "4 PM",
        endTime: "4:30 PM"
    },
    {
        title: "Planning",
        description: "Review the day's tasks and plan tomorrow",
        status: "Pending",
        startTime: "9 PM",
        endTime: "9:30 PM"
    }
];

task.insertMany(allTasks);


