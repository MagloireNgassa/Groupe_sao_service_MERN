const express = require('express');
const cors = require('cors');  
const app = express();
app.use(cors());

const mongoose = require('mongoose');
const connection = mongoose.connection;

var bodyParser = require('body-parser'); 
const Client = require('./Models/modelClient');
const Service = require('./Models/modelService');
app.use(bodyParser.json());                            
app.use(bodyParser.urlencoded({ extended: true })); 

//mongoose.connect('mongodb://localhost:27017/groupeSaoDb',{ useUnifiedTopology: true, useNewUrlParser: true });


mongoose.connect('mongodb+srv://SaoGroupe:le_mot_de_passe@clustersaogroupe.n7o0s.mongodb.net/saogroupedb?retryWrites=true&w=majority');

/*const PORT = 3019;
app.listen(PORT,()=>{                                  
    console.log("j'écoute le port 3019!!");
});*/
const PORT = 3535;
app.listen(PORT,()=>{                                  
    console.log("j'écoute le port 3535!!");
});                                                    

connection.once('open',()=>{
    console.log("connected to MongoDb");
});

//ajout d'un client
app.post('/addClient',(req, res)=>{                  
    console.log('req.body', req.body);             
    const clientAdd = new Client(req.body);        
    clientAdd.save((err, clientAdd)=>{                 
        if(err){
            return res.status(500).json(err);           
        }
        res.status(201).json(clientAdd);                
    });
});

// selection de tout les client
app.get('/client',(req,res)=>{
    Client.find()
    .exec()
    .then(client => res.status(200).json(client));
});

// selection de un seul client
app.get('/client/:id',(req,res)=>{
    const id = req.params.id;
    Client.findById(id)
    .exec()
    .then(client => res.status(200).json(client));
});

//selection des clients avec une qui ont le statut programmer
app.get('/clientProgammer',(req,res)=>{
    Client.find({statut:"Client programmé"})
    .exec()
    .then(client => res.status(200).json(client));
});
//selection des clients clients qui ont le statut effectuer
app.get('/serviceEffectuer',(req,res)=>{
    Client.find({statut:"Service éffectué"})
    .exec()
    .then(client => res.status(200).json(client));
});

//selection des clients qui ont le statut client a relancer
app.get('/relancerClient',(req,res)=>{
    Client.find({statut:"Client à relancer"})
    .exec()
    .then(client => res.status(200).json(client));
});

//selection d'un client a parti de son numero de telephone
app.get('/telephone/:phone',(req,res)=>{
    const phone = req.params.phone;
    Client.find({telephone:phone})
    .exec()
    .then(client => res.status(200).json(client));
});
//suppression d'un client
app.delete('/delClient/:id',(req,res)=>{
    const id = req.params.id;
    Client.findByIdAndDelete(id,(err, client)=>{                    
        if(err){
            return res.status(500).json(err);
        }
        res.status(202).json({msg: `client avec l'id ${client.id} à été supprimé`});
    });
});

//modification d'un client
app.put('/modifClient/:id',(req,res)=>{
    const id = req.params.id;
    Client.findByIdAndUpdate(id,req.body,(err, client)=>{                   
        if(err){
            return res.status(500).json(err);
        }
        res.status(202).json({msg: `client avec l'id ${client.id} à été modifier`});
    });
}); 

//--------------------Management de la collection service-------------------------------

//ajout un service
app.post('/addService',(req, res)=>{                  
    console.log('req.body', req.body);             
    const serviceAdd = new Service(req.body);        
    serviceAdd.save((err, serviceAdd)=>{                 
        if(err){
            return res.status(500).json(err);           
        }
        res.status(201).json(serviceAdd);                
    });
});

//selection des services
app.get('/service',(req,res)=>{
    Service.find()
    .exec()
    .then(service => res.status(200).json(service));
});

//selcetion d'un seul service
app.get('/service/:id',(req,res)=>{
    const id = req.params.id;
    Service.findById(id)
    .exec()
    .then(service => res.status(200).json(service));
});
 
//suppression d'un service
app.delete('/delService/:id',(req,res)=>{
    const id = req.params.id;
    Departement.findByIdAndDelete(id,(err, departement)=>{                    
        if(err){
            return res.status(500).json(err);
        }
        res.status(202).json({msg: `departement avec l'id ${departement.id} à été supprimé`});
    });
});

//modification d'un service
app.put('/modifService/:id',(req,res)=>{
    const id = req.params.id;
    Departement.findByIdAndUpdate(id,req.body,(err, departement)=>{                   
        if(err){
            return res.status(500).json(err);
        }
        res.status(202).json({msg: `departement avec l'id ${departement.id} à été modifier`});
    });
}); 

 
