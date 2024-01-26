<script>
export default {}
</script>

<template>
  <nav>
    <ul>
      <li><a><RouterLink :to="{name: 'home'}">Home</RouterLink></a></li>
      <li><a><RouterLink :to="{name: 'plataformas'}">Plataformas</RouterLink></a></li>
      <li><a><RouterLink :to="{name: 'categorias'}">Categorias</RouterLink></a></li>
      <li><a><RouterLink :to="{name: 'nuevoJuego'}">Nuevo Juego</RouterLink></a></li>
      <li><a><RouterLink :to="{name: 'pedidos'}">Pedido</RouterLink></a></li>
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