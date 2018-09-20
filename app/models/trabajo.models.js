const mongoose = require('mongoose');

const TrabajoSchema = mongoose.Schema({
    fechaDeEntrega: String,
    tipo: String,
    grupal: Boolean
});

module.exports = mongoose.model('Trabajo', TrabajoSchema);