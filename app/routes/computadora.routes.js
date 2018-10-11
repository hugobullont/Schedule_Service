module.exports = (app) => {
    const computadoras = require('../controllers/computadora.controller.js');
    //GET Computadoras
    app.get('/computadoras',computadoras.findAll);

    //GET Computadoras por id
    app.get('/computadoras/:id',computadoras.findById);

    //POST Computadora
    app.post('/computadoras',computadoras.addOne);

    //GET Computadora hacer reserva
    app.put('/computadoras/:sede/:numero/:hora',computadoras.computerReservation);

    //DELETE  Computadora 
    app.delete('/computadoras/:id', computadoras.deleteComputer);
}