const mongoose = require('mongoose');  

const serviceSchema =  mongoose.Schema({
    service: String,
    chauffeur: String,
    vehicule: String
    
});

module.exports = mongoose.model('service', serviceSchema);