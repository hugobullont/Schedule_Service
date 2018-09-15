module.exports = (app) => {
    const clases = require('../controllers/clase.controller.js');

    //Crear una Clase
    app.post('/clases',clases.create);

    // Retrieve all Clases
    app.get('/clases', clases.findAll);

    // Retrieve a single Cl with noteId
    app.get('/clases/:day', clases.findPerDay);

    app.get('/clases/:day/:hour', clases.findNextClass);

};