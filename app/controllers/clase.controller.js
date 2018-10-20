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
        
        async function generateObject(array,resp){
            for (const item of array){
                await Curso.findOne({'clases._id':  item._id}).then(curso => {
                    var object = new Object();
                    var cursoFinal = new Object();
                    cursoFinal._id = curso._id;
                    cursoFinal.nombre = curso.nombre,
                    cursoFinal.profesor = curso.profesor;
                    cursoFinal.faltasRestantes = curso.faltasRestantes;
                    object.Curso = cursoFinal;
                    object.Clase = item;
                    resp.push(object);
                });
            } 
            return res.send(resp); 
        }

        generateObject(clasesPendientes,respuesta);
        
    });
};

/*function responseClases(curso,clase,counter,respuesta){
    return new Promise((resolve,reject)=>{
        var object = new Object();
            var cursoFinal = new Object();
            cursoFinal._id = curso._id;
            cursoFinal.nombre = curso.nombre,
            cursoFinal.profesor = curso.profesor;
            cursoFinal.faltasRestantes = curso.faltasRestantes;
            object.Curso = cursoFinal;
            object.Clase = clase;
            respuesta.push(object);
            counter = counter + 1;
            resolve(respuesta);
            resolve(counter);
    });
}*/