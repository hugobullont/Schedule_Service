const Clase = require('../models/clase.models.js');
const Curso = require('../models/node.models.js');

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
    var find = false;
    var claseActual = null;
    var hourAux = 2400; 

    Clase.find({dia: day})
    .then(clases => {
        for(var i = 0; i < clases.length; i++){
            if((hour > clases[i].horaInicio)&&(hour<clases[i].horaFinal-15)){
                claseActual = clases[i];
                find = true;
            }
        }
        
        if(!find){
            for(var i = 0; i < clases.length; i++){
                if((hour<clases[i].horaInicio)&&(clases[i].horaInicio<hourAux)){
                    claseActual = clases[i];
                    hourAux = clases[i].horaInicio;
                    find = true;
                }
            }
        }

        if(claseActual === null){
            return res.send({message: "No hay Clases"});
        }

        Curso.findOne({'clases': {$elemMatch: {'_id': claseActual._id}}})
        .then(curso =>{
            var object = new Object();
            var cursoFinal = new Object();
            cursoFinal._id = curso._id;
            cursoFinal.nombre = curso.nombre;
            cursoFinal.profesor = curso.profesor;
            cursoFinal.faltasRestantes = curso.faltasRestantes;
            object.Curso = cursoFinal;
            object.Clase = claseActual;

            return res.send(object);
        });
    });
    
};