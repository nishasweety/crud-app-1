const express = require('express');
const router = express.Router();
const Patient = require('../models/patient.model'); 

// Route: List all patients
router.get('/', (req, res) => {
  Patient.find().lean()
    .then(data => {
      res.render('patients/index', { patients: data }); 
    })
    .catch(err => console.log('Error during fetching operation:\n', err));
});

// Route: Show add form (Add New Patient)
router.get('/addOrEdit', (req, res) => {
  res.render('patients/addOrEdit', { patient: {} }); 

// Route: Show edit form with existing data
router.get('/addOrEdit/:id', (req, res) => {
  Patient.findById(req.params.id).lean()
    .then(data => res.render('patients/addOrEdit', { patient: data }))
    .catch(err => console.log('Error while retrieving the record:\n', err));
});

// Route: Handle add or edit form submission
router.post('/addOrEdit', (req, res) => {
  const patient = {
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    contact: req.body.contact,   
    city: req.body.city,         
    diagnosis: req.body.diagnosis,
  };
  
  const { _id } = req.body;

  if (_id === '') {
    // Insert new patient
    new Patient({ ...patient }).save()
      .then(() => res.redirect('/patients'))
      .catch(err => console.log('Error during insertion:\n', err));
  } else {
    // Update existing patient
    Patient.findByIdAndUpdate(_id, patient)
      .then(() => res.redirect('/patients'))
      .catch(err => console.log('Error during update operation:\n', err));
  }
});

// Route: Delete patient
router.post('/delete/:id', (req, res) => {
  Patient.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/patients'))
    .catch(err => console.log('Error during deletion:\n', err));
});

module.exports = router;
