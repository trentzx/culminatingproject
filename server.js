const express = require('express');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');
const app = express();
const port = 3000;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_ObDf-DYF6ZifXy3IDY-HykyYn-Hzhk4",
    authDomain: "culminatingproject-tej4m.firebaseapp.com",
    projectId: "culminatingproject-tej4m",
    storageBucket: "culminatingproject-tej4m.appspot.com",
    messagingSenderId: "13739041714",
    appId: "1:13739041714:web:a71ea4c0e184156afb3aab",
    measurementId: "G-KE68KQXQT6"
};

// Initialize Firebase Admin SDK
// Note: You need to replace 'path/to/your/service-account-file.json' with the path to your Firebase service account file
var serviceAccount = require('culminatingproject/firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // If you are using any Firebase services like Firestore or Firebase Storage, add their configurations here
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Updated login endpoint using Firebase Authentication
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        // Firebase Admin SDK doesn't verify passwords. Handle this on the client side or use a custom token approach
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
