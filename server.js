const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/productModel'); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.set('strictQuery', false);

mongoose
    .connect('mongodb+srv://admin:AKshay123@cluster0.iqf9kfk.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(error);
    });

app.use(bodyParser.json());

app.listen(3006, () => {
    console.log(`Server is running on port ${3006}`);
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
        const updatedData = req.body;
        const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedData, { new: true });
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update student' });
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


app.get('/api/students/:standard', async (req, res) => {
    try {
        const standard = req.params.standard;
        const students = await Student.find({ Standard: standard });
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve students' });
    }
});


app.get('/api/students/:standard/:division', async (req, res) => {
    try {
        const {standard,division} = req.params;
        const students = await Student.find({ Standard: standard, Division: division });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve students' });
    }
})
