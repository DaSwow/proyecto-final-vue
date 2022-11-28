const peliculas = require("../modelos/peliculas");

rutas.get("/", async (req, res) => {
  const listapeliculas = await peliculas.find();

  res.render("hola", { listapeliculas });
});

rutas.get("/peliculas:id?", async (req, res) => {
  const { id } = req.query;
  const listapeliculas = await peliculas.find({ id: id });
  res.render("hola", { listapeliculas });
});

//middleware
rutas.use(function (req, res, next) {
  if (req.query._method == "PUT") {
    req.method = "PUT";
    req.url = req.path;
  }
  if (req.query._method == "DELETE") {
    req.method = "DELETE";
    req.url = req.path;
  }
  next();
});

rutas.put("/peliculas/:id", async (req, res) => {
  const id = req.params.id;
  var disponible = await peliculas.findOne({ id: id });
  if (disponible.disponible === false) {
    await peliculas.updateOne({ id: id }, { $set: { disponible: true } });
  } else {
    await peliculas.updateOne({ id: id }, { $set: { disponible: false } });
  }

  res.redirect("/");
});

rutas.delete("/peliculas/:id", async (req, res) => {
  const id = req.params.id;
  await peliculas.deleteOne({ id: id });
  res.redirect("/");
});

rutas.post("/peliculas", async (req, res) => {
  var e = new peliculas(req.body);
  await peliculas.insertMany(e);
  res.redirect("/");
});

module.exports = rutas;
