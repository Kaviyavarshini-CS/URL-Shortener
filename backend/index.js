const express = require('express');
const bodyParser = require('body-parser');
const urlRoutes = require('./routes/urlRoutes');
const cors = require('cors'); // ✅ import cors
const app = express();

app.use(cors({
  origin: '*', // Allow all origins — you can restrict this to 'http://127.0.0.1:5500' if you prefer
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());
app.use('/api', urlRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));