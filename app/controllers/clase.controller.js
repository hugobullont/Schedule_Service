const Clase = require('../models/node.models.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.salon) {
        return res.status(400).send({
            message: "Una Clase debe tener salon."
        });
    }

    // Create a Clase
    const clase = new Clase({
        horaInicio: req.body.horaInicio, 
        horaFinal: req.body.horaFinal,
        salon: req.body.salon,
        dia: req.body.dia,
        curso: req.body.curso
    });

    // Save Clase in the database
    clase.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Clase."
        });
    });
};

// Retrieve and return all clases from the database.
exports.findAll = (req, res) => {
    Clase.find()
    .then(clases => {
        res.send(clases);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving clases."
        });
    });
};

// Retrieve and return all clases from the database.
exports.findPerDay = (req, res) => {
    const day = req.params.day
    Clase.find({dia: day})
    .then(clase => {
        if(!clase) {
            return res.status(404).send({
                message: "Clase not found in day " + req.params.day
            });            
        }
        res.send(clase);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Clase not found in day " + req.params.day
            });                
        }
        return res.status(500).send({
            message: "Clase not found in day " + req.params.day
        });
    });
};


exports.findNextClass = (req, res) => {
    const day = req.params.day
    const hour = req.params.hour

    Clase.find({dia: day})
    .then(clases => {
        for(var i = 0; i < clases.length; i++){
            if((hour > clases[i].horaInicio)&&(hour<clases[i].horaFinal-15)){
                return res.send(clases[i]);
            }
        }
        var claseActual = null;
        var hourAux = 2400; 
        
        for(var i = 0; i < clases.length; i++){
            if((hour<clases[i].horaInicio)&&(clases[i].horaInicio<hourAux)){
                claseActual = clases[i];
                hourAux = clases[i].horaInicio;
            }
        }

        if(claseActual === null){
            return res.send({message: "No hay Clases"});
        }
        return res.send(claseActual);
    });
    
};