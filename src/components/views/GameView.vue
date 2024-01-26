<template>
  <div class="row">
    <h1>Listado de Juegos</h1>
    <table class="table table-striped table-hover">
      <thead class="thead-dark">
      <tr>
        <th>Imagen</th>
        <th>Id</th>
        <th>Nombre</th>
        <th>Descripcion</th>
        <th>Plataforma</th>
        <th>Categoria</th>
        <th>Acciones</th>
      </tr>
      </thead>
      <tbody>
      <GameItem v-for="juego in juegos"
                    :key="juego.id" :juego="juego">
        <th>
          <button class="edit" title="Editar" @click="this.$router.push('/juegos-edit/' + juego.id)">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button class="delete" title="Eliminar" @click="handleDelete(juego)">
            <span class="material-symbols-outlined">delete</span>
          </button>
          <button class="delete" title="Eliminar" @click="handleAddCart(juego)">
            <span class="material-symbols-outlined">cart</span>
          </button>
        </th>
      </GameItem>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useStore } from '@/stores/index.js'
import JuegosRepository from '@/repositories/juegos.repository.js'
import GameItem from '@/components/utils/GameItem.vue'

export default {
  components: { GameItem },
  props: ['id', 'nombre'],
  computed: {
    ...mapState(useStore, ['categorias']),
  },
  data (){
    return{
      juegos : []
    }
  },
  async mounted() {
    if (this.nombre === "category") {
      try {
        const repositoryCategorias = new JuegosRepository();
        this.juegos = await repositoryCategorias.getJuegoByCategoria(this.id);
      } catch (error) {
        alert(error);
      }
    } else if (this.nombre === "plataforma") {
      try {
        const repositoryCategorias = new JuegosRepository();
        this.juegos = await repositoryCategorias.getJuegoByPlataforma(this.id);
      } catch (error) {
        alert(error);
      }
    } else {
      const repositoryCategorias = new JuegosRepository();
      this.juegos = await repositoryCategorias.getAllJuegos();
    }
  },
  methods: {
    ...mapActions(useStore, ['addJuegoFromCart']),
    async handleDelete(juego) {
      try {
        const repositoryCategorias = new JuegosRepository();
        this.juegos = await repositoryCategorias.removeJuego(juego.id);
        this.$router.push({name: "juegos"});
      } catch (error) {
        alert(error);
      }
    },
    handleAddCart(juego){
      this.addJuegoFromCart(juego);
      this.$router.push("/pedidos");
    }
  }
}
</script>
