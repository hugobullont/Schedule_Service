const mongoose = require('mongoose');

const ExamenSchema = mongoose.Schema({
    fecha: String,
    tipo: String,
    temas: [String]
});

module.exports = mongoose.model('Examen', ExamenSchema);