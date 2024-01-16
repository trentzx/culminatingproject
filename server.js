const express = require('express');
const app = express();
const port = 3000;

// Body parser middleware to parse JSON bodies
app.use(express.json());

// Handle POST request for user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Here, you would typically look up the user in your database,
    // and compare the password hash you have stored with the hash of the password provided.

    // This is a mock example, where we pretend any login is successful
    if (email && password) {
        // Login successful
        res.json({ message: 'Login successful', user: email });
    } else {
        // Login failed
        res.status(401).json({ message: 'Login failed' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
