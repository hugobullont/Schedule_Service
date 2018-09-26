module.exports = (app) => {
    const examenes = require('../controllers/examen.controller.js');
    //GET Examen cercano para un curso via ID
    app.get('/examenes/:cursoId/:date',trabajos.findPerDateAndID);
}