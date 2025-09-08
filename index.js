const express = require('express');
const admin = require('firebase-admin');

const app = express();
const port = 3000;

// Your Firebase configuration from the Firebase Console
// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// Allow JSON data in requests
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to my telemedicine app!');
});

// Login endpoint
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
app.post('/appointments', async (req, res) => {
  const { patientEmail, doctorName, date, time } = req.body;
  if (!patientEmail || !doctorName || !date || !time) {
    return res.status(400).send('All fields are required');
  }
  try {
    const docRef = await db.collection('appointments').add({
      patientEmail,
      doctorName,
      date,
      time
    });
    res.status(201).send('Appointment booked with ID: ' + docRef.id);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});

// List appointments endpoint
app.get('/appointments', async (req, res) => {
  try {
    const snapshot = await db.collection('appointments').get();
    const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(appointments);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});