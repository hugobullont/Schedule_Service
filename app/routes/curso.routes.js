module.exports = (app) => {
    const clases = require('../controllers/curso.controller.js');

    //Crear una Clase
    app.post('/cursos',clases.create);

    // Retrieve all Clases
    app.get('/cursos', clases.findAll);

    // Retrieve a single Cl with noteId
    /*app.get('/clases/:day', clases.findPerDay);

    app.get('/clases/:day/:hour', clases.findNextClass);*/

};