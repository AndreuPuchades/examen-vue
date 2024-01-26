<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/index.js'
import TypesItem from '@/components/utils/TypesItem.vue'

export default {
  components: { TypesItem },
  computed: {
    ...mapState(useStore, ['plataformas']),
  },
}
</script>

<template>
  <div class="row">
    <h1>Listado de Plataformas</h1>
    <table class="table table-striped table-hover">
      <thead class="thead-dark">
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Acciones</th>
      </tr>
      </thead>
      <tbody>
      <TypesItem v-for="plataforma in plataformas"
                 :key="plataforma.id" :category="plataforma">
        <button @click="this.$router.push('/juegos/plataforma/' + plataforma.id)"
                class="btn btn-sm"
                title="Ver juegos"
        >
          <i class="bi bi-joystick"></i>
        </button>
      </TypesItem>
      </tbody>
    </table>
  </div>
</template>
