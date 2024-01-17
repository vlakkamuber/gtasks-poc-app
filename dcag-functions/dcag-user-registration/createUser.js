const express = require('express');
const admin = require('firebase-admin');
const cors = require("cors")
const app = express();
// Initialize Firebase Admin SDK
const serviceAccount = require('./anz-driver-ops-ritu-f53a0fa0d07e.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://anz-driver-ops-ritu.firebaseio.com',
});
app.use(express.json());
app.use(cors())
// Define your API endpoint to create a user
app.post('/createUser', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required.' });
    }
    // Create the user
    const userRecord = await admin.auth().createUser({
      phoneNumber,
    });
    console.log('Successfully created new user:', userRecord.uid);
    // Respond with the created user details
    res.status(201).json({ userId: userRecord.uid, phoneNumber: userRecord.phoneNumber });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});