const Curso = require('../models/node.models.js');
const Trabajo = require('../models/trabajo.models.js');
const Clase = require('../models/clase.models.js');
const Examen = require('../models/examen.models.js');
const Nota = require('../models/nota.models.js');

// Create and Save a new Note
exports.create = (req, res) => {
    console.log("POST /cursos");
    // Create a Curso
    const curso = new Curso({
        nombre: req.body.nombre,
        profesor: req.body.profesor,
        faltasRestantes: req.body.faltasRestantes
    });

    const trabajosArray = req.body.trabajos;
    for (var i = 0; i<trabajosArray.length; i++){
        const trabajo = new Trabajo({
            "fechaDeEntrega": trabajosArray[i].fechaDeEntrega,
            "tipo": trabajosArray[i].tipo,
            "grupal": trabajosArray[i].grupal
        });
        trabajo.save();
        curso.trabajos.push(trabajo);
    }

    const examenesArray = req.body.examenes;
    for (var i=0; i<examenesArray.length; i++){
        const examen = new Examen({
            "fecha": examenesArray[i].fecha,
            "tipo": examenesArray[i].tipo,
            "temas": examenesArray[i].temas
        });
        examen.save();
        curso.examenes.push(examen);
    }

    const clasesArray = req.body.clases;
    for (var i=0; i<clasesArray.length; i++){
        const clase = new Clase({
            "horaInicio": clasesArray[i].horaInicio,
            "horaFinal": clasesArray[i].horaFinal,
            "salon": clasesArray[i].salon,
            "dia": clasesArray[i].dia,
            "tipo": clasesArray[i].tipo
        });
        clase.save();
        curso.clases.push(clase);
    }

    const notasArray = req.body.notas;
    for (var i=0; i<notasArray.length; i++){
        const nota = new Nota({
            "detalle": notasArray[i].detalle,
            "valor": notasArray[i].valor,
            "porcentaje": notasArray[i].porcentaje
        });
        nota.save();
        curso.notas.push(nota);
    }

    // Save Curso in the database
    curso.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Curso."
        });
    });
};

// Retrieve and return all cursos from the database.
exports.findAll = (req, res) => {
    console.log("GET /cursos");
    Curso.find()
    .then(cursos => {
        res.send(cursos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving clases."
        });
    });
};