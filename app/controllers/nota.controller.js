const Curso = require('../models/node.models.js');

//GET Todas las Notas de un Curso
exports.findAllForID = (req,res) => {
    console.log("GET /notas");
    
    const id = req.params.cursoId;

    Curso.findOne({'_id': id})
    .then(curso =>{
        return res.send(curso.notas);
    });
};