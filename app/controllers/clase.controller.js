const Clase = require('../models/clase.models.js');
const Curso = require('../models/node.models.js');


// Retrieve and return all clases from the database.
exports.findPerDay = (req, res) => {
    const day = req.params.day
    console.log("GET /clases");
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
    console.log("GET clases");
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

exports.findNextClassesPerDay = (req, res) => {
    const day = req.params.day
    const hour = req.params.hour
    console.log("GET clasesPendientes");
    var clasesPendientes= [];
    var respuesta = [];

    Clase.find({dia: day})
    .then(clases => {
        for(var i = 0; i < clases.length; i++){
            if((hour > clases[i].horaInicio)&&(hour<clases[i].horaFinal)){
                clasesPendientes.push(clases[i]);
            }
        }
        
        for(var i = 0; i < clases.length; i++){
            if((hour<clases[i].horaInicio)){
                clasesPendientes.push(clases[i]);
            }
        }

        if(clasesPendientes.length === 0){
            return res.send({message: "No hay Clases"});
        }
        var final = clasesPendientes.length;
        var contador = 0;
        var ids = [];
        for (var i = 0; i < clasesPendientes.length; i++){
            ids.push(clasesPendientes[i]._id);
        }

        var cursos = [];
        console.log(ids);
        for (var i = 0; i < clasesPendientes.length; i++){
            console.log(clasesPendientes[i]._id);
            Curso.findOne({'clases._id':  ids[i]})
            .then(curso =>{
                cursos.push(curso);
            });
        }
        console.log(cursos);
        for (var i = 0; i < clasesPendientes.length; i++){
            var object = new Object();
            var cursoFinal = new Object();
            cursoFinal._id = cursos[i]._id;
            cursoFinal.nombre = cursos[i].nombre,
            cursoFinal.profesor = cursos[i].profesor;
            cursoFinal.faltasRestantes = cursos[i].faltasRestantes;
            object.Curso = cursoFinal;
            object.Clase = clasesPendientes[i];
            respuesta.push(object);
            console.log('Added');
            if (i == clasesPendientes.length - 1){
                return res.send(respuesta);
            }
        }

        
                
    });
};