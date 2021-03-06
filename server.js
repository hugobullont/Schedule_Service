const express = require('express');
const bodyParser = require('body-parser');

//creating express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Schedule application."});
});

require('./app/routes/curso.routes.js')(app);
require('./app/routes/clase.routes.js')(app);
require('./app/routes/trabajo.routes.js')(app);
require('./app/routes/examen.routes.js')(app);
require('./app/routes/nota.routes.js')(app);
require('./app/routes/computadora.routes.js')(app);

// listen for requests
app.listen(80, () => {
    console.log("Server is listening on port 80");
});

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});