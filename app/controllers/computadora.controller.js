const Computadora = require('../models/computadora.models.js');

// Create and Save a new Computer
exports.addOne = function(req,res){
    console.log("POST /computadoras");
    var data = 
    {
        sede: req.body.sede,
        numero: req.body.numero,
        disponibles: req.body.disponibles,
        horas: req.body.horas
    }

    var comp = new Computadora(data);

    comp.save()
    .then(d => {
        res.send(d);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Curso."
        });
    });
}

// Retrieve and return all cursos from the database.
exports.findAll = (req, res) => {
    console.log("GET /computadoras");
    Computadora.find()
    .then(Computadora => {
        res.send(Computadora);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving computers."
        });
    });
};

exports.findById = function(req,res){
    console.log("GET /computadorasById");
    Computadora.findOne({"_id": req.params.id},function(error,computadora)
    {
        if(error){
            res.send("Something was wrong with finding by id.")}else{
            res.send(computadora);}
        
    })
};


exports.computerReservation = (req,res) => {
    console.log("PUT /computerReservation");
    const sede = req.params.sede;
    const numero = req.params.numero;
    const hora = req.params.hora;
    //const duracion = req.params.duracion;
    
    var horasdecomputadora = [];
    var disponibilidaddecomputadora = [];
    
    console.log(sede);
    console.log(numero);
    console.log(hora);

    Computadora.findOne({'sede': sede,'numero': numero})
    .then(compu =>{
        id = compu._id;
        horasdecomputadora = compu.horas;
        disponibilidaddecomputadora = compu.disponibles;
        for(var i = 0; i<horasdecomputadora.length; i++)
        {
            if(horasdecomputadora[i] == hora)
            {
                if(disponibilidaddecomputadora[i] == false)
                {
                    return res.status(200).send({
                        code: 2,
                        message: "La computadora no esta disponible."
                    });
                }else
                {
                    disponibilidaddecomputadora[i] = false;

                    //updatear disponibildiad de data
                    var data = 
                    {
                        sede: sede,
                        numero: numero,
                        horas: horasdecomputadora,
                        disponibles: disponibilidaddecomputadora
                    }
                    Computadora.update({"sede": sede, "numero": numero},data,function(){
                        return res.status(200).send({
                            code: 1,
                            message: "Reservado con exito."
                        });
                    });
                }
                
            }
        }
         
    });
 };

 exports.deleteComputer = function(req,res){
    Computadora.remove({"_id": req.params.id},function(error){
        if(error){
            console.log(error)
        }else
        {
            res.send("Computer deleted.");
        }
    })
}