const mongoose = require('mongoose');  

const clientSchema =  mongoose.Schema({
    service: String,
    nom: String,
    telephone: String,
    date: String,
    heure: String,
    adressPrise: String,
    adressDepot: String,
    montant: Number,
    statut: String,
    observation: String
    
});

module.exports = mongoose.model('client', clientSchema);

