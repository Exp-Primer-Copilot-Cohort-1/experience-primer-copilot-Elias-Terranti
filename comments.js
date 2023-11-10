// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Create express app
const app = express();

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Create route handler
app.get('/status', (req, res) => {
  res.send({
    message: 'hello world'
  });
});

// Start server
app.listen(process.env.PORT || 8081);

