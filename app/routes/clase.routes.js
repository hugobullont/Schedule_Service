module.exports = (app) => {
    const clases = require('../controllers/clase.controller.js');

    // Retrieve a single Cl with noteId
    app.get('/clases/:day', clases.findPerDay);

    app.get('/clases/:day/:hour', clases.findNextClass);

};