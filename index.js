const Joi = require('joi');
const express = require('express');
const app = express();
const subjects = require('./routes/subjects');

app.use(express.json());
app.use('/api/subjects', subjects);

const port = global.process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
