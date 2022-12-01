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
          <td>

            <form @submit.prevent="eliminarPelicula(pelicula.id)">
              <button type="submit" style="border:none;" class="btn btn-outline-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                  class="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path
                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg>
              </button>
            </form>
          </td>
          <td>
            <form @submit.prevent="editarPelicula(pelicula.id)">
              <button type="submit" style="border:none;" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-pen"
                  viewBox="0 0 16 16">
                  <path
                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                </svg>
              </button>
            </form>
          </td>

          <td></td>
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
    async cargarTabla() {
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
        console.error(error)
      }

    },
    async eliminarPelicula(idpeli) {
      alert("Película eliminada: " + idpeli)
    },
    async editarPelicula(idpeli) {
      alert("Película a editar: " + idpeli)
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