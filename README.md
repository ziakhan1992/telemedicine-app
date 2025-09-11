# Telemedicine App

A simple telemedicine backend built with Node.js, Express, and Firebase Firestore. This project provides APIs for user login and appointment management.

## Features
- User login with basic authentication
- Create and list appointments, stored in Firebase Firestore

## Tech Stack
- Node.js v20.18.0
- Express v5.1.0
- firebase-admin for backend Firestore access

## Setup & Installation
1. Clone the repo:
   ```sh
   git clone https://github.com/ziakhan1992/telemedicine-app.git
   cd telemedicine-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up Firebase Admin SDK credentials:
   - Create a Firebase project in the Firebase Console
   - Download your service account key JSON file
   - Set the environment variable `GOOGLE_APPLICATION_CREDENTIALS` to the path of your service account key file

## Usage
Start the server:
```sh
node index.js
```

The server will run at `http://localhost:3000`

### API Endpoints
- `POST /login`
  - Request body: `{ "email": "test@example.com", "password": "password123" }`
  - Response: Login success or failure
- `POST /appointments`
  - Request body: `{ "patientEmail": "...", "doctorName": "...", "date": "YYYY-MM-DD", "time": "HH:MM" }`
  - Response: Appointment booked with ID
- `GET /appointments`
  - Response: List of all appointments

## Notes
- Ensure your Firestore database is set up in your Firebase project.
- For production, use environment variables for sensitive data and configuration.

## License
ISC
