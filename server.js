const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Student, Class } = require('./models/productModel');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.set("strictQuery",false)
mongoose.
connect('mongodb+srv://admin:Akshay123@cluster0.iqf9kfk.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to MongoDB')
  
}).catch((error)=>{
    console.log(error)
})

app.use(bodyParser.json());

app.listen(3006, () => {
    console.log(`Server is running on port ${3006}`);
});


app.post('/api/classes', async (req, res) => {
    try {
        const classData = req.body;
        const newClass = await Class.create(classData);
        res.json(newClass);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create class' });
    }
});


app.get('/api/classes', async (req, res) => {
    try {
        const classes = await Class.find({});
        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve classes' });
    }
});


app.post('/api/students', async (req, res) => {
    try {
        const studentData = req.body;
        const newStudent = await Student.create(studentData);
        res.json(newStudent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create student' });
    }
});

app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve students' });
    }
});


app.put('/api/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const { classId } = req.body;
        const updatedStudent = await Student.findByIdAndUpdate(studentId, { classId }, { new: true });
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update student' });
    }
});


app.delete('/api/classes/:id', async (req, res) => {
    try {
        const classId = req.params.id;
        await Class.findByIdAndRemove(classId);
        res.json({ message: 'Class deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete class' });
    }
});


app.delete('/api/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        await Student.findByIdAndRemove(studentId);
        res.json({ message: 'Student deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

