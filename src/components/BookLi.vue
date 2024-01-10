<script>
import BooksRepository from '@/repositories/books.repository.js';
import BookItem from './BookItem.vue';
import router from '@/router/index.js';
import { useStore } from '@/stores/index.js';
import { mapActions } from 'pinia'

export default {
  data() {
    return {
      books: []
    }
  },
  components: {
    BookItem
  },
  async mounted() {
    const booksRepository = new BooksRepository()
    try {
      this.books = await booksRepository.getAllBooks()
    } catch (e) {
      alert(e)
    }
  },
  methods :{
    router() {
      return router
    },
    ...mapActions(useStore, ['setMessageAction']);
    async delBook() {
      const booksRepository = new BooksRepository()
      if (
        confirm(
          'Desea borrar el libro con id: ' + this.book.id + ' y módulo: ' + this.book.idModule
        )
      ) {
        await booksRepository.removeBook(this.book.id);
      }
    }
  }
}
</script>

<template>
  <div id="list">
    <book-item v-for="book in books" v-bind:book="book">
    <div>
      <button @click="router().push('/editBookForm/:id', book.id)" id="edit-{{book.id}}">
        <span class="material-icons">edit</span> Editar
      </button>
      <button @click="delBook" id="remove-{{book.id}}">
        <span class="material-icons">delete</span> Eliminar
      </button>
    </div>
    </book-item>
  </div>
</template>