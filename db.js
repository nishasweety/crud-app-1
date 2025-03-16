const mongoose = require('mongoose')


const dbUri = 'mongodb+srv://nisha:sanashayan@cluster0.9sd2d.mongodb.net/patients_detail_db?retryWrites=true&w=majority&appName=Cluster0'


module.exports = () => mongoose.connect(dbUri) 