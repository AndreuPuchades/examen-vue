<script>
import BooksRepository from '@/repositories/books.repository.js';
import BookItem from './BookItem.vue';
import router from '@/router/index.js';

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
    const booksRepository = new BooksRepository();
    try {
      this.books = await booksRepository.getAllBooks();
    } catch (error) {
      alert(error);
    }
  },
  methods :{
    //...mapActions(useStore, ['setMessageAction']);
    router() {
      return router;
    },
    async delBook(book) {
      const booksRepository = new BooksRepository();
      if (
        confirm('Desea borrar el libro con id: ' + book.id + ' y módulo: ' + book.idModule)
      ) {
        await booksRepository.removeBook(book.id);
      }
    }
  }
}
</script>

<template>
  <div id="list">
    <book-item v-for="book in books" v-bind:book="book">
    <div>
      <button @click="router().push({name: 'editBookForm', params: {id: book.id}})" id="edit-{{book.id}}">
        <span class="material-icons">edit</span> Editar
      </button>
      <button @click="delBook(book)" id="remove-{{book.id}}">
        <span class="material-icons">delete</span> Eliminar
      </button>
    </div>
    </book-item>
  </div>
</template>