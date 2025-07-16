import express from 'express';
import configP from './src/config.server.js'; // make sure this path is correct

const app = express();
const PORT = configP.port;

// Optional: basic route
app.get('/', (req, res) => {
  res.send('Movie API is running');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
