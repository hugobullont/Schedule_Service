const mongoose = require('mongoose');

const ExamenSchema = mongoose.Schema({
    fecha: Number,
    tipo: String,
    temas: [String]
});
//fechaFormato: YYYYMMDD 18 de octubre 2018 es 20181018
module.exports = mongoose.model('Examen', ExamenSchema);