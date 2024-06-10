const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up file upload handling with multer
const upload = multer({ dest: 'uploads/' });

// Handle text submission
app.post('/text', (req, res) => {
  const text = req.body['text-input'];
  console.log('Received text:', text); // Log received text to console
  res.send('Text received: ' + text); // Send received text back in response
});

// Handle file upload
app.post('/upload', upload.single('file-upload'), (req, res) => {
  const file = req.file;
  console.log('Received file:', file); // Log received file information to console
  res.send('File uploaded: ' + file.filename); // Send received file information back in response
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
