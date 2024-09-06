import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse incoming JSON requests

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.post('/shorten', async (req, res) => {
  const longURL = req.body.url;

  try {
    const response = await axios.post('https://cleanuri.com/api/v1/shorten', { url: longURL });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching shortened URL' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
