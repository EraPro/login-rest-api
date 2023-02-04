const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.yur1ore.mongodb.net/?retryWrites=true&w=majorityy', { useNewUrlParser: true);

mongoose.set('strictQuery', false);

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Define schema for user
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create model for user
const User = mongoose.model('User', userSchema);

// Route for register
app.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  newUser.save((err, user) => {
    if (err) {
      res.status(400).send({ message: 'Username already exists' });
    } else {
      res.send({ message: 'Successfully registered' });
    }
  });
});

// Route for login
app.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.status(500).send({ message: 'Error occured while logging in' });
    } else if (!user) {
      res.status(400).send({ message: 'Username not found' });
    } else if (user.password !== req.body.password) {
      res.status(400).send({ message: 'Incorrect password' });
    } else {
      const token = jwt.sign({ username: user.username }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE2NzU1MTQ3ODIsImV4cCI6MTY3NTYwMTE4Mn0.iYq1_6Nl1MtAbTaIWExdF1OD2RZQW7H2ZfWhLZlbVyU');
      res.send({ token: token });
    }
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
