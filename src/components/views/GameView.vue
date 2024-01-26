<template>
  <div class="row">
      <h1>Listado de categorias</h1>
      <table class="table table-striped table-hover">
        <thead class="thead-dark">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="category in categorias"
            :key="category.id"
          >
            <td>{{ category.id }}</td>
            <td>{{ category.nombre }}</td>
            <td>
              <button @click="this.$router.push('/juegos/category/' + category.id)"
                class="btn btn-sm"
                title="Ver juegos"
              >
                <i class="bi bi-joystick"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/index.js'

export default {
  computed: {
    ...mapState(useStore, ['categorias']),
  },
}
</script>
