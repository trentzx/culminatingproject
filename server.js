const express = require('express');
const cors = require('cors');
const path = require('path'); // Node.js module for handling and transforming file paths
const fs = require('fs'); // Require the filesystem module
const app = express();
const port = 3000;

const EXAMPLE_USER_EMAIL = 'test@example.com';
const EXAMPLE_USER_PASSWORD = 'test';

app.use(cors());
app.use(express.json());

// Serve static files correctly from the root directory
app.use(express.static(path.join(__dirname))); 

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === EXAMPLE_USER_EMAIL && password === EXAMPLE_USER_PASSWORD) {
        res.json({ message: 'Login successful', user: email });
    } else {
        res.status(401).json({ message: 'Login failed' });
    }
});

// When a GET request is made to '/dashboard', send 'main.html'
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
