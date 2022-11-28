<template>
  <head>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
      crossorigin="anonymous"
    />
  </head>
  <!-- Tabla de peliculas-->
  <div id="ComponentePeliculas">
    
    <form action="/peliculas" method="POST" id="idtabla">
      <input type="text" name="id" required placeholder="Ingresa el ID" />
      <br />
      <input
        type="text"
        name="nombre"
        required
        placeholder="Ingresa el nombre"
      />
      <br />
      <input type="submit" class="btn btn-info" />
    </form>

    <form action="/peliculas" method="GET">
      <input type="text" name="id" placeholder="Buscar por ID" /> <br />
      <input type="submit" class="btn btn-info" />
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