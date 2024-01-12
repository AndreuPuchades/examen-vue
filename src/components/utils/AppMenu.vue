<script>
export default {}
</script>

<template>
  <nav>
    <ul>
      <li><a><RouterLink :to="{name: 'inicio'}">Ver Libros</RouterLink></a></li>
      <li><a><RouterLink :to="{name: 'bookForm'}">Añadir Libro</RouterLink></a></li>
      <li><a><RouterLink :to="{name: 'carrito'}">Carrito</RouterLink></a></li>
      <li><a><RouterLink :to="{name: 'compras'}">Mis Compras</RouterLink></a></li>
      <li><a><RouterLink :to="{name: 'about'}">Acerca de...</RouterLink></a></li>
    </ul>
  </nav>
  <RouterView/>
</template>

<style scoped>
nav {
  background-color: #444;
  padding: 15px;
  text-align: center;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline-block;
  margin-right: 15px;
}

a {
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease;
}

a:hover {
  color: #bab9b9;
}
</style>