const mongoose = require('mongoose');

require('../models/trabajo.models.js');

require('../models/examen.models.js');

require('../models/clase.models.js');

const CursoSchema = mongoose.Schema({
    nombre: String,
    profesor: String,
    faltasRestantes: Number,
    trabajos: [mongoose.model('Trabajo').schema],
    examenes: [mongoose.model('Examen').schema],
    clases: [mongoose.model('Clase').schema]
});

module.exports = mongoose.model('Curso', CursoSchema);