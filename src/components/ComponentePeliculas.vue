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
      <input v-model="atributos.disponible" type="checkbox" name="disponible"  >
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
      }

    }

  },
  methods: {

    async agregarPelicula() {
      try {
        if(this.disponible  != ""){
          this.disponible=true
        } else {
          this.disponible=false
        }
        alert(this.atributos)
        this.axios.post("/peliculas",this.atributos)
        .then((res)=>{
          this.Atributos.push(res.data);
        
        })
      } catch (error) {
        console.error(error)
      }

    }
  }


}
</script>