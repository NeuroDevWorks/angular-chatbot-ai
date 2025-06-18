const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle Angular routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 AngularAI Demo server running at http://localhost:${port}`);
  console.log(`📱 Open your browser and navigate to: http://localhost:${port}`);
  console.log(`🔑 Don't forget to add your OpenAI API key to test the AI features!`);
});
