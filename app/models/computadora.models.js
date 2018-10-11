const mongoose = require('mongoose');

const ComputadoraSchema = mongoose.Schema({
    sede: String,
    numero: Number,
    disponibles: [Boolean],
    horas: [Number]
});
//fechaFormato: YYYYMMDD 18 de octubre 2018 es 20181018
module.exports = mongoose.model('Computadora', ComputadoraSchema);