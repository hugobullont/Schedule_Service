const mongoose = require('mongoose');

const NotaSchema = mongoose.Schema({
    detalle: String,
    valor: Number,
    porcentaje: Number
});

module.exports = mongoose.model('Nota',NotaSchema);