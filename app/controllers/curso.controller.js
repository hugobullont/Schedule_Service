const Curso = require('../models/node.models.js');
const Trabajo = require('../models/trabajo.models.js');
const Clase = require('../models/clase.models.js');
const Examen = require('../models/examen.models.js');

// Create and Save a new Note
exports.create = (req, res) => {

    // Create a Curso
    const curso = new Curso({
        nombre: req.body.nombre,
        profesor: req.body.profesor,
        faltasRestantes: req.body.faltasRestantes/*,
        trabajos: req.body.trabajos,
        examenes: req.body.examenes,
        clases: req.body.clases*/
    });

    const trabajos = new Trabajo({
        "fechaDeEntrega": req.body.trabajos[0].fechaDeEntrega,
        "tipo": req.body.trabajos[0].tipo,
        "grupal": req.body.trabajos[0].grupal
    });
    //const examanes = new Examen(req.body.examanes[0]);
    //const clases = new Clase(req.body.clases[0]);

    trabajos.save();
    //examanes.save();
    //clases.save();

    curso.trabajos.push(trabajos);
    //curso.examenes.push(examanes);
    //curso.clases.push(clases);

    // Save Clase in the database
    curso.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Curso."
        });
    });
};

// Retrieve and return all clases from the database.
exports.findAll = (req, res) => {
    Curso.find()
    .then(cursos => {
        res.send(cursos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving clases."
        });
    });
};
/*
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
    
}; */