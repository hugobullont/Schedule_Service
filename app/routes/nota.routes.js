module.exports = (app) => {
    const notas = require('../controllers/nota.controller.js');
    app.get('/notas/:cursoId',notas.findAllForID);
    app.get('/notasAcumuladas',notas.totalNotasAcum);
}