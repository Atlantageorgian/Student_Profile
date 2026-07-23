const express = require('express');
const app = express();

const PORT = 5000;

const profiles = [];

app.use(express.json());

// To create a new student profile
app.post('/createstudentprofile', (req, res) => {
    const {firstName, lastName, email, phoneNumber, age, address, gender, course, grade} = req.body;

    const studentProfile = {
        studentId: profiles.length + 1,
        firstName, 
        lastName, 
        email, 
        phoneNumber, 
        age, 
        address, 
        gender, 
        course, 
        grade,
        enrolledDate: new Date()
    };

    profiles.push(studentProfile);

    res.status(201).json({message: 'Student profile created successfully'});
}    
);

// To get all student profiles
app.get('/getstudentprofiles', (req,res) =>{
    res.json(profiles);
});

// To get a student profile by ID
app.get('/getastudentprofile/:id', (req,res) => {
    const studentId = parseInt(req.params.id);
    const studentProfile = profiles.find(profile => profile.studentId === studentId);
    if (!studentProfile) {
        return res.status(404).json({message: 'Student profile not found'});
    }
    res.json(studentProfile);
});

// To update a student profile by ID
app.put('/updatestudentprofile/:id', (req,res) => {
    const studentId = parseInt(req.params.id);
    const {firstName, lastName, email, phoneNumber, age, address, gender, course, grade, level} = req.body;
    const studentProfile = profiles.find(profile => profile.studentId === studentId);

    if (!studentProfile) {
        return res.status(404).json({message: 'Student profile not found'});
    };
    res.status(200).json({message: 'Student profile updated successfully'});
});

// To delete a student profile by ID
app.delete('/deletestudentprofile/:id', (req,res) => {
    const studentId = parseInt(req.params.id);
    const index = profiles.findIndex(profile => profile.studentId === studentId);
    if (index === -1) {
        return res.status(404).json({message: 'Student profile not found'});
    };
    profiles.splice(index, 1);
    res.status(200).json({message: 'Student profile deleted successfully'});
});

app.listen (PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

