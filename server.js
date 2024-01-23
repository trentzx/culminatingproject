const express = require('express');
const app = express();
const fs = require('fs');
const nodemailer = require('nodemailer');

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a nodemailer transporter (configure with your email service)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'trents.medication.reminder@gmail.com',
        pass: 'sgbozpqnjhidxkbc' // Generate an App Password for security
    }
});

// Read HTML and CSS files

var index = fs.readFileSync('index.html');
var main = fs.readFileSync('main.html');
var script = fs.readFileSync('script.js');
var indexCss = fs.readFileSync('index.css');
var styleCss = fs.readFileSync('style.css');


// Define routes for serving HTML and CSS files


app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.send(index)
  })

  app.get('/main.html', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.send(main)
  })

  app.get('/script.js', (req, res) => {
    res.set('Content-Type', 'text/javascript')
    res.send(script)
  })

  app.get('/index.css', (req, res) => {
    res.set('Content-Type', 'text/css')
    res.send(indexCss)
  })

  app.get('/style.css', (req, res) => {
    res.set('Content-Type', 'text/css')
    res.send(styleCss)
  })

// Define a route to handle form submissions
app.post('/sendReminder', (req, res) => {
  const email = req.body.email;
  const medicationName = req.body.medication;
  const reminderTime = new Date(req.body['reminder-time']);

  // Schedule sending of email reminder
    setTimeout(() => {
        const mailOptions = {
            from: 'trents.medication.reminder@gmail.com',
            to: email,
            subject: 'News Reminder',
            text: `This is the most recent news letter: ${JSON.stringify(medicationName)}`
          };
console.log(mailOptions)
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'Error sending email' }); // Respond with JSON error
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ message: 'Reminder email sent successfully!' }); // Respond with JSON success message
            }
        });
    }, reminderTime - Date.now());

    res.send("");
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
