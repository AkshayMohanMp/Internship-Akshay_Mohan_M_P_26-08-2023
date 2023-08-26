const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a name"]
        },
        rollNo: {
            type: Number,
            required: true
        },
        classId: {
            type: String, 
            
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Student = mongoose.model('Student', StudentSchema);

const ClassSchema = mongoose.Schema(
    {
        Standard: {
            type: Number,
            required: [true, "Please enter the Standard"]
        },
        Division: {
            type: String, 
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Class = mongoose.model('Class', ClassSchema);

module.exports = { Student, Class };
