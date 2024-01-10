<script>

import router from '@/router/index.js'

export default {
  methods: {
    router() {
      return router
    }
  },
  props: {
    idBook: {
      type: Number,
      required: true
    }
  },
}
</script>

<template>
  <button @click="router().push('/editBookForm/:id', this.idBook)" class="edit">
    <span class="material-icons">icono edit</span>
  </button>
</template>