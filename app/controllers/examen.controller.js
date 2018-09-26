const Curso = require('../models/node.models.js');
const Examen = require('../models/examen.models.js');

 //GET Examen cercano para un curso via ID
 exports.findPerDateAndID = (req,res) => {
    const id = req.params.cursoId;
    console.log(id);
    const date = req.params.date;
    console.log(date);
    var todos = [];
    var minorDate = 20501231;
    var examenCercano;
    
    Curso.findOne({'_id': id})
    .then(curso =>{
        todos = curso.examenes;
        console.log(todos);
        for(var i = 0; i < todos.length; i++){
            if((todos[i].fecha >= date) && (todos[i].fecha < minorDate)){
                minorDate = todos[i].fecha;
                examenCercano = todos[i];
            }
        }
        return res.send(examenCercano);
    });
 };