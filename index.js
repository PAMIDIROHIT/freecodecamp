const express = require('express');
const app = express();

// Helper function to format date in UTC string format
const formatUTCDate = (date) => date.toUTCString();

// API endpoint to handle date requests
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  let dateObj;
  
  if (!date) {
    // If no date is provided, use the current date
    dateObj = new Date();
  } else if (!isNaN(date)) {
    // If the date is a valid timestamp
    dateObj = new Date(Number(date));
  } else {
    // Try to parse the date string
    dateObj = new Date(date);
  }

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Respond with the date in both Unix timestamp and UTC string formats
  res.json({
    unix: dateObj.getTime(),
    utc: formatUTCDate(dateObj),
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

