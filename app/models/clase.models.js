const mongoose = require('mongoose');

const ClaseSchema = mongoose.Schema({
    horaInicio: Number,
    horaFinal: Number,
    salon: String,
    dia: String,
    tipo: String
});

module.exports = mongoose.model('Clase', ClaseSchema);