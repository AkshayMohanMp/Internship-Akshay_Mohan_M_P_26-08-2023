const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rollNo: {
            type: String,
            required: true,
        },
        Standard: {
            type: Number,
            required: true,
        },
        Division: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
