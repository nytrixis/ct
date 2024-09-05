const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const teacherRoutes = require('./routes/teacherRoutes');
const roomRoutes = require('./routes/roomRoutes');
const labRoutes = require('./routes/labRoutes');




dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Simple test route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });
app.use('/api/teachers', teacherRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/labs', labRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
