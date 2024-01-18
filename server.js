const express = require('express');
const cors = require('cors');
const path = require('path'); // Node.js module for handling and transforming file paths
const fs = require('fs'); // Require the filesystem module
const app = express();
const port = 3000;
const admin = require('firebase-admin');
// Initialize Firebase
const fbapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fbapp);

const EXAMPLE_USER_EMAIL = 'test';
const EXAMPLE_USER_PASSWORD = 'test';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_ObDf-DYF6ZifXy3IDY-HykyYn-Hzhk4",
  authDomain: "culminatingproject-tej4m.firebaseapp.com",
  projectId: "culminatingproject-tej4m",
  storageBucket: "culminatingproject-tej4m.appspot.com",
  messagingSenderId: "13739041714",
  appId: "1:13739041714:web:a71ea4c0e184156afb3aab",
  measurementId: "G-KE68KQXQT6"
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname)));
  
  // Updated login endpoint using Firebase Authentication
  app.post('/login', async (req, res) => {
      const { email, password } = req.body;
  
      try {
          const userRecord = await admin.auth().getUserByEmail(email);
          // Here, normally you would verify the password, but Firebase Admin SDK does not allow
          // retrieving the actual password for security reasons.
          // Instead, consider using Firebase client SDK on the frontend for authentication
          // or a custom token approach with Firebase Admin SDK.
          if (userRecord.email === email) {
              res.json({ message: 'Login successful', user: email });
          } else {
              res.status(401).json({ message: 'Login failed' });
          }
      } catch (error) {
          res.status(401).json({ message: 'Login failed', error: error.message });
      }
  });
  
  app.get('/dashboard', (req, res) => {
      res.sendFile(path.join(__dirname, 'main.html'));
  });
  
  app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
  });