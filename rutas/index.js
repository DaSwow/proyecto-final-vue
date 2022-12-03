const express = require('express');
const rutas = express.Router();

const peliculas = require("../modelos/peliculas");


rutas.get("/", async (req, res) => {
  const listapeliculas = await peliculas.find();
  res.json(listapeliculas);
});
//buscador por id
rutas.get("/peliculas/:id", async (req, res) => {
  const id = req.params.id;
  const listapeliculas = await peliculas.find({id:id});  
    res.json(listapeliculas); 
});

rutas.post("/peliculas", async (req, res) => {
  //console.log(req.body)
  var e = new peliculas(req.body);
  await peliculas.insertMany(e);
  res.status(200).json()
});


rutas.put("/peliculas/:id", async (req, res) => {
  const id =  req.params.id
  const peli = {
    id : req.body.id,
    nombre : req.body.nombre,
    genero : req.body.genero,
    disponible : req.body.disponible,
  }

  await peliculas.findByIdAndUpdate(id, peli )
  res.status(200).json()


});

rutas.delete("/peliculas/:id", async (req, res) => {
  const id = req.params.id;
  await peliculas.deleteOne({ _id: id });
  res.status(200).json()
});



module.exports = rutas;
