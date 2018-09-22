const mongoose = require('mongoose');

const TrabajoSchema = mongoose.Schema({
    fechaDeEntrega: Number,
    tipo: String,
    grupal: Boolean
});
//formatofecha YYYYMMDD
module.exports = mongoose.model('Trabajo', TrabajoSchema);