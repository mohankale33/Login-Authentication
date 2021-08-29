const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const routing = require('./routes/routing');

const app =express();
app.use(bodyparser.json());
app.use(cookieParser());
app.use('/', routing);

const port = process.env.PORT || 3021;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});