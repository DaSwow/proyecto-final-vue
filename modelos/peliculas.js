const mongo = require('mongoose')
const esquema = mongo.Schema

const peliculasEsquema = new esquema({
    id:String,
    nombre: String,
    genero: String, 
    disponible: {
        type:Boolean,
        default:false
    }
})

module.exports= mongo.model('peliculas',peliculasEsquema);
