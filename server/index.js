// Express
const express = require("express");
const app = express();

// Load environment variables
require('dotenv').config();

// Mongoose
const mongoose = require('mongoose');
const dbURI = process.env.MONGO_URI;
main()
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB Connection Error:", err));
async function main() {
    await mongoose.connect(dbURI);
}

// Models
const task = require("./models/task.js");

// Method Override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Path
const path = require("path");

// Parse data
app.use(express.urlencoded({extended : true}));
app.use(express.json());

// Views
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"../client/views"));

// Public
app.use(express.static(path.join(__dirname,"../client/public")));

// Port
const port = 8080;
app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
});

// ROUTING

// INDEX : main route...view all tasks
app.get("/tasks",async (req,res)=>{
    let tasks = await task.find();
    console.log("showed all tasks");
    res.render("index.ejs",{tasks});
});

// CREATE : add new task
app.get("/tasks/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/tasks",async (req,res)=>{
    let {title, startTime, endTime, description, status} = req.body;
    let newTask = new task({title, startTime, endTime, description, status});
    await newTask.save();
    console.log("task added");
    res.redirect("/tasks");
});

// READ : view single task
app.get("/tasks/:id", async (req, res) => {
    try {
        let {id} = req.params;
        let Task = await task.findById(id);
        if (!Task) {
            return res.status(404).send("Task not found");
        }
        console.log("viewed single task");
        res.render("show.ejs",{Task});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// UPDATE : update specific task
app.get("/tasks/edit/:id", async (req, res) => {
    try {
        let {id} = req.params;
        let Task = await task.findById(id);
        if (!Task) {
            return res.status(404).send("Task not found");
        }
        res.render("edit.ejs", { Task });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
app.put("/tasks/:id",async (req,res)=>{
    let {id} = req.params;
    let {title, startTime, endTime, description, status } = req.body;
    let updatedTask = await task.findByIdAndUpdate(id, {title, startTime, endTime, description, status}, {runValidators: true, new: true});
    console.log("task updated");
    res.redirect("/tasks");
});

// DELETE : delete a task
app.delete("/tasks/:id",async (req,res)=>{
    let {id} = req.params;
    await task.findByIdAndDelete(id);
    console.log("task deleted");
    res.redirect("/tasks");
});

// SEARCH
app.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        const tasks = await task.find({ title: new RegExp(query, 'i') });
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
});

// FILTER
app.get('/filter', async (req, res) => {
    const query = req.query.q;
    try {
        let tasks;
        if(query==="all"){
            tasks = await task.find({});
        }
        else if(query==="in-progress"){
            tasks = await task.find({status : "In Progress"});
        }
        else if(query==="completed"){
            tasks = await task.find({status : "Completed"});
        }
        else{
            tasks = await task.find({status : "Pending"});
        }
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
});

// error : invalid route
app.get("/*",(req,res)=>{
    res.send("ERROR : Page doesn't exists");
});
