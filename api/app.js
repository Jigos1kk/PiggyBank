const express = require('express');
const apiRouter = require('./routes/api');

const app = express();

app.use(express.json());
app.use('/api', apiRouter);

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});