<template>
  <div class="row">
      <h1>Listado de Categorias</h1>
      <table class="table table-striped table-hover">
        <thead class="thead-dark">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
            <TypesItem v-for="category in categorias"
                          :key="category.id" :category="category">
              <button @click="this.$router.push('/juegos/category/' + category.id)"
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

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/index.js'
import TypesItem from '@/components/utils/TypesItem.vue'

export default {
  components: { TypesItem },
  computed: {
    ...mapState(useStore, ['categorias']),
  },
}
</script>
