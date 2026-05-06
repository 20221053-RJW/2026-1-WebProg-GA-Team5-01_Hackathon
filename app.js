console.log('Hello, World!');
const express = require('express');
const app = express();

app.listen(1000, function () {
    console.log('Server is running on port 1000');
});

app.get('/', function (req, res) {
    res.send(__dirname + '/public/student.html');
});

app.get('/student', function (req, res) {
    res.send(__dirname + '/public/student.html');
});

app.get('/teacher', function (req, res) {
    res.send(__dirname + '/public/teacher.html');
});

app.get('/enter', function (req, res) {
    res.send(__dirname + '/public/enter.html');
});

app.get('/save', function (req, res) {
    console.log('Question saved!');
});

