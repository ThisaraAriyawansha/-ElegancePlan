const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb://localhost:27017/elegancePlan'; // Directly include MongoDB URI here

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Contact model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
});
const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.post('/api/contact/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log('Request body:', req.body); // Log the request body for debugging

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    console.log('Message saved successfully:', newContact); // Log success message

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving message:', error); // Log errors for debugging
    res.status(500).json({ message: 'Failed to send message', error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
