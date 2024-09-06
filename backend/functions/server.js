// backend/functions/server.js
import express from 'express';
import axios from 'axios';
import serverless from 'serverless-http';

const app = express();
const router = express.Router();

app.use(express.json()); // Parse incoming JSON requests

// Allow requests from frontend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

// Define the /shorten route
router.post('/shorten', async (req, res) => {
  const longURL = req.body.url;

  try {
    const response = await axios.post('https://cleanuri.com/api/v1/shorten', { url: longURL });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching shortened URL' });
  }
});

// Use the router
app.use('/.netlify/functions/server', router);

export const handler = serverless(app);
