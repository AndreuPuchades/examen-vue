<script>
import BooksRepository from '@/repositories/books.repository.js'

export default {
  props: {
    idBook: {
      type: Number,
      required: true
    },
    idModule: {
      type: String,
      required: false
    }
  },
  methods: {
    async delBook() {
      if (confirm("Quieres borrar este libro con id " + this.idBook + " y con modulo " + this.idModule + "?")) {
        const repository = new BooksRepository();
        await repository.removeBook(this.idBook);
      }
    }
  }
}
</script>

<template>
  <button @click="delBook" class="delete">
    <span class="material-icons">icono delete</span>
  </button>
</template>
