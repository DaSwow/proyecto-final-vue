const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
var corsOptions = {
    origin :'http://localhost:8080',
    credentials:true, 
    optionsSuccessStatus:200
}
app.use(cors(corsOptions))

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json())

//Conexión a base de datos
const  mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/crud-proyecto-final').
    then(db=>{console.log('Conectado a BDD.')}).
    catch(err=>console.log("Error al conectarse a la BDD"));


//Configurar rutas
const indiceRutas = require('../rutas/index');
app.use('/',indiceRutas);


app.listen(3000, ()=>{
    console.log("Conectado en el puerto 3000.");
});