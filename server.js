const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// local imports
const connectDb = require('./db');
const patientRoutes = require('./controller/patient.controller');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (optional, if you use CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));

// Use patient routes
app.use('/patients', patientRoutes);

// Root route redirect
app.get('/', (req, res) => {
  res.redirect('/patients');
});

// configure view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

connectDb()
  .then(() => {
    console.log('db connection succeeded.');
    app.listen(5000, () => {
      console.log('server started at 5000.');
    }).on('error', err => console.log('server ignition failed:\n', err));
  })
  .catch(err => console.log('error in connecting db\n:', err));
