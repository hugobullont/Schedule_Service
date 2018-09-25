module.exports = (app) => {
    const trabajos= require('../controllers/trabajo.controller.js');
    //GET Trabajo cercano para un curso via ID
    app.get('/trabajos/:cursoId/:date',trabajos.findPerDateAndID);
};