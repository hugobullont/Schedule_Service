const Curso = require('../models/node.models.js');
const Trabajo = require('../models/trabajo.models.js');

 //GET Trabajo cercano para un curso via ID
 exports.findPerDateAndID = (req,res) => {
    const id = req.params.cursoId;
    console.log(id);
    const date = req.params.date;
    console.log(date);
    var todos = [];
    var minorDate = 20501231;
    var trabajoCercano;
    
    Curso.findOne({'_id': id})
    .then(curso =>{
        todos = curso.trabajos;
        console.log(todos);
        for(var i = 0; i < todos.length; i++){
            if((todos[i].fechaDeEntrega >= date) && (todos[i].fechaDeEntrega < minorDate)){
                minorDate = todos[i].fechaDeEntrega;
                trabajoCercano = todos[i];
            }
        }
        return res.send(trabajoCercano);
    });
 };