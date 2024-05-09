const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const memberRouter = require('./routes/memberRoute');
const courseRouter = require('./routes/courseRoute');
const enrollmentRouter = require('./routes/enrollmentRoute');

app.use('/members', memberRouter);
app.use('/courses', courseRouter);
app.use('/enrollments', enrollmentRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Test the Vercel
app.get("/", (req, res) => {
	res.send("You succeeded to deploy backend to Vercel!");
});