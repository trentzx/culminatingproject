const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const nodemailer = require('nodemailer');
const axios = require('axios');
const crypto = require('crypto');

app.use(cors());

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a nodemailer transporter (configure with your email service)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'trents.medication.reminder@gmail.com',
        pass: 'sgbozpqnjhidxkbc' // Replace with your App Password
    }
});

// Read HTML and CSS files
var index = fs.readFileSync('index.html');
var main = fs.readFileSync('main.html');
var script = fs.readFileSync('script.js');
var indexCss = fs.readFileSync('index.css');
var styleCss = fs.readFileSync('main.css');

// Define routes for serving HTML and CSS files
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.send(index)
});

app.get('/main.html', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(main);
})

app.get('/main.css', (req, res) => {
    res.set('Content-Type', 'text/css')
    res.send(styleCss)
});

app.get('/script.js', (req, res) => {
  fs.readFile('script.js', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading script.js:', err);
      res.status(404).send('Not found');
    } else {
      res.set('Content-Type', 'text/javascript');
      res.send(data);
    }
  });
});



// ... (Keep your existing app.get routes for script.js and other files)

// User registration for updates
let userPreferences = {};

// Define a route to handle form submissions
app.post('/sendReminder', (req, res) => {
    const { email, 'news-source': newsSource } = req.body;
    userPreferences[email] = newsSource; // Store the user's preference
    res.json({ message: 'You will be notified when updates are detected.' });
});

// Update checking logic
let previousHashes = {
  cnn: '',
  nbc: ''
};

// Function to fetch website content and return a hash
const fetchContentHash = async (url) => {
  try {
    const response = await axios.get(url);
    const content = response.data;
    return crypto.createHash('sha256').update(content).digest('hex');
  } catch (error) {
    console.error(`Error fetching content from ${url}:`, error);
    return null;
  }
};

// Function to check a specific website for updates
const checkForUpdates = async (websiteName, url, email) => {
  const currentHash = await fetchContentHash(url);
  if (currentHash && previousHashes[websiteName] && currentHash !== previousHashes[websiteName]) {
    // The content has changed, send an email
    sendUpdateEmail(websiteName, email);
  }
  previousHashes[websiteName] = currentHash; // Update the stored hash
};

// Function to send an update email
const sendUpdateEmail = (websiteName, email) => {
  const mailOptions = {
    from: 'trents.medication.reminder@gmail.com',
    to: email,
    subject: `${websiteName} Website Update`,
    text: `The ${websiteName} website has been updated. Check out the new content!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error sending email for ${websiteName}:`, error);
    } else {
      console.log(`Update email sent for ${websiteName}: ` + info.response);
    }
  });
};

const checkAllUsersForUpdates = () => {
  for (const [email, newsSource] of Object.entries(userPreferences)) {
    const url = newsSource === 'cnn' ? 'https://www.cnn.com' : 'https://www.nbcnews.com';
    checkForUpdates(newsSource, url, email); // Pass the email to checkForUpdates
  }
};

// Check for updates every 30 minutes (1800000 milliseconds)
setInterval(checkAllUsersForUpdates, 1800000);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
