const mongoose = require('mongoose');

const ExamenSchema = mongoose.Schema({
});

module.exports = mongoose.model('Examen', ExamenSchema);

const TrabajoSchema = mongoose.Schema({
    tipo: String
});

module.exports = mongoose.model('Trabajo', TrabajoSchema);

const TemaSchema = mongoose.Schema({
});

module.exports = mongoose.model('Tema',TemaSchema)

const CursoSchema = mongoose.Schema({
    nombre: String,
    profesor: String,
    faltasRestantes: Number

});

module.exports = mongoose.model('Curso', CursoSchema);

const ClaseSchema = mongoose.Schema({
    horaInicio: Number,
    horaFinal: Number,
    salon: String,
    dia: String,
    tipo: String,
    curso: CursoSchema
});

module.exports = mongoose.model('Clase', ClaseSchema);