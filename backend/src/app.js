const express = require('express');
const app = express();
const index = require('./routes/index');
var bodyParser = require("body-parser")
var cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use('/api', index);


module.exports = app;