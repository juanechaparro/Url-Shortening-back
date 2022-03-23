const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();
//crear servidor
console.log(process.env);
const app = express();
// Base de datos
dbConnection();

//CORS
app.use(cors());
// public directory
app.use( express.static('public'));
// Body parse
app.use(express.json());
//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo ${process.env.PORT}` )
})