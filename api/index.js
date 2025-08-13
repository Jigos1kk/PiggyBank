require('dotenv').config()

const express = require('express');
const app = express();
const routes = require('./routes')
const cors = require('cors');

const origins = require('./config/origins.json')

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (origins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.json());
app.use('/api', routes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});