<template>

  <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous" />
  </head>
  <!-- Tabla de peliculas-->
  <div id="ComponentePeliculas">

    <form @submit.prevent="agregarPelicula()">
      <input v-model="atributos.id" type="text" name="id" required placeholder="Ingresa el ID" /><br />
      <input v-model="atributos.nombre" type="text" name="nombre" required placeholder="Ingresa el nombre" /><br />
      <input v-model="atributos.genero" type="text" name="genero" required placeholder="Ingresa el genéro" /><br />
      <input v-model="atributos.disponible" type="checkbox" name="disponible">
      <label for="disponible">Disponible</label><br />

      <input type="submit" class="btn btn-info" value="Agregar Película" />
    </form>


    <table class="table">
      <thead class="thead-light">
        <th scope="col">ID</th>
        <th scope="col">Nombre</th>
        <th scope="col">Genero</th>
        <th scope="col">Disponibilidad</th>
      </thead>
      <tbody>
        <tr v-for="pelicula in peliculas " :key="pelicula.id">
          <td>{{ pelicula.id }}</td>
          <td>{{ pelicula.nombre }}</td>
          <td>{{ pelicula.genero }}</td>
          <td>{{ getDisponible(pelicula.disponible) }}</td>
        </tr>
      </tbody>
    </table>




  </div>
</template>

<script>

export default {
  data() {
    return {
      Atributos: [],
      atributos: {
        id: "",
        nombre: "",
        genero: "",
        disponible: false,
      },
      peliculas: []

    }
  },

  //Este metodo llena la tabla al iniciarse la página
  created() {
   this.cargarTabla()
  },
  methods: {
    //Metodo para en lugar de mostrar un true o false,
    //se marca si o no
    getDisponible(disponible) {
      if (disponible === true) {
        return "Si"
      } else {
        return "No"
      }
    },
    async cargarTabla(){
    //Obtenemos todas la peliculas
    this.axios.get("/").then(res => {
      //El atributo de la lista de peliculas se llena con la info
      //recuperada
      this.peliculas = res.data;
    }).catch(error => {
      console.log(error)
    })

    },

    async agregarPelicula() {
      try {
        if (this.disponible != "") { this.disponible = true }
        else { this.disponible = false }


        this.axios.post("/peliculas", this.atributos)
          .then((res) => {
            this.Atributos.push(res.data);
            this.atributos.id = ""
            this.atributos.nombre = ""
            this.atributos.genero = ""
            this.atributos.disponible = false
            this.cargarTabla()

          })
      } catch (error) { 
        alert("Película no se pudo agregar")
        console.error(error) }

    },
    async listarTodo() {
      try {
        this.axios.get("/")
          .then((response => {
            this.peliculas = response.data
          }))
      } catch (error) { console.error }
    }
  }


}
</script>