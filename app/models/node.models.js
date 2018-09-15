const mongoose = require('mongoose');

const CursoSchema = mongoose.Schema({
    nombre: String,
    profesor: String,
    faltasRestantes: Number,
    fechaProximoExamen: String,
    fechaTrabajoFinal: String
});

module.exports = mongoose.model('Curso', CursoSchema);

const ClaseSchema = mongoose.Schema({
    horaInicio: Number,
    horaFinal: Number,
    salon: String,
    dia: String,
    curso: CursoSchema
});

module.exports = mongoose.model('Clase', ClaseSchema);