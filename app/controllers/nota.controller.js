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

//GET Todas las notas por curso acumuladas.
exports.totalNotasAcum = (req,res) => {
    console.log("GET /notasAcumuladas");
    var objects = []
    Curso.find()
    .then(cursos =>{
        for(var i = 0; i < cursos.length; i++){
            var notas = cursos[i].notas;
            var notaAcumulada = 0;
            var porcentaje = 0;
            for(var j = 0; j < notas.length; j++){
                var percent = notas[i].porcentaje / 100;
                notaAcumulada += notas[i].valor*percent;
                porcentaje += notas[i].porcentaje;
            }
            var object = new Object();
            object.nombreCurso = curso[i].nombre;
            object.notaAcumulada = notaAcumulada;
            object.porcentaje = porcentaje;
            objects.push(object);
        }
        return res.send(objects);
    });
};