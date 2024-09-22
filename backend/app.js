const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

// Initialize the app and middleware
const app = express();
app.use(bodyParser.json()); // To parse JSON request body
const upload = multer(); // For handling multipart form-data (though none is needed in this case)

// POST Route: Processes JSON input
app.post('/bfhl', upload.none(), (req, res) => {
  const { data, file_b64 } = req.body;

  let numbers = [];
  let alphabets = [];
  let highestLowercase = null;

  // Separate numbers and alphabets
  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/[a-zA-Z]/.test(item)) {
      alphabets.push(item);
    }
  });

  // Find the highest lowercase alphabet
  const lowercaseAlphabets = alphabets.filter(char => /[a-z]/.test(char));
  if (lowercaseAlphabets.length > 0) {
    highestLowercase = lowercaseAlphabets.sort().reverse()[0];
  }

  // Base64 file validation
  let fileValid = false;
  let fileMimeType = null;
  let fileSizeKb = null;
  if (file_b64) {
    const buffer = Buffer.from(file_b64, 'base64');
    fileValid = true;
    fileSizeKb = (buffer.length / 1024).toFixed(2);
    fileMimeType = "image/png"; // Assume PNG for now
  }

  // Return the response
  res.json({
    is_success: true,
    user_id: "Chinni Yandapalli",
    email: "chinni_yandapalli@srmap.edu.in",
    roll_number: "AP21110011409",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb
  });
});

// GET Route: Returns operation code
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
