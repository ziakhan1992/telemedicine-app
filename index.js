const express = require('express');
const app = express();
const port = 3000;

// Allow JSON data in requests
app.use(express.json());

// In-memory storage for appointments (temporary)
let appointments = [];

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to my telemedicine app!');
});

// Login endpoint (from previous step)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }
  if (email === 'test@example.com' && password === 'password123') {
    res.send('Login successful!');
  } else {
    res.status(401).send('Invalid email or password');
  }
});

// Create appointment endpoint
app.post('/appointments', (req, res) => {
  const { patientEmail, doctorName, date, time } = req.body;
  if (!patientEmail || !doctorName || !date || !time) {
    return res.status(400).send('All fields are required');
  }
  const appointment = { patientEmail, doctorName, date, time, id: appointments.length + 1 };
  appointments.push(appointment);
  res.status(201).send('Appointment booked: ' + JSON.stringify(appointment));
});

// List appointments endpoint
app.get('/appointments', (req, res) => {
  res.send(appointments);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});