const mongoose = require('mongoose');

require('../models/trabajo.models.js');

require('../models/examen.models.js');

require('../models/clase.models.js');

require('../models/nota.models.js');

const CursoSchema = mongoose.Schema({
    nombre: String,
    profesor: String,
    faltasRestantes: Number,
    trabajos: [mongoose.model('Trabajo').schema],
    examenes: [mongoose.model('Examen').schema],
    clases: [mongoose.model('Clase').schema],
    notas: [mongoose.model('Nota').schema]
});

module.exports = mongoose.model('Curso', CursoSchema);