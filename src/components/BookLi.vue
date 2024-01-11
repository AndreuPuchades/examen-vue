<script>
import BooksRepository from '@/repositories/books.repository.js'
import BookItem from './BookItem.vue'
import router from '@/router/index.js'
import { useCounterStore } from '@/stores/index.js'
import SalesRepository from '@/repositories/sales.repository.js'

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
    try {
      const booksRepository = new BooksRepository();
      this.books = await booksRepository.getAllBooks();
    } catch (error) {
      this.addMessage(error);
    }
  },
  methods: {
    async isSold(idBook) {
      const salesRepository = new SalesRepository();
      const book = await salesRepository.getSalesByIdBook(idBook);
      return book;
    },
    addMessage(text){
      useCounterStore().addMessage(text);
    },
    router() {
      return router;
    },
    addBookFromCart(book){
      useCounterStore().addBookFromCart(book);
      this.$router.push({name: 'carrito'});
    },
    async delBook(book) {
      if (confirm('Desea borrar el libro con id "' + book.id + '" y módulo "' +  useCounterStore().getModuleById(book.idModule).cliteral + '"')) {
        try{
          const booksRepository = new BooksRepository();
          await booksRepository.removeBook(book.id);
          this.$router.push({name: 'inicio'});
        } catch (error){
          this.addMessage(error);
        }
      }
    }
  }
}
</script>

<template>
  <div id="list">
    <book-item v-for="book in books" v-bind:book="book">
      <div v-if="isSold(book.id)">
        <p>Este libro ya esta vendido</p>
      </div>
      <div v-else>
        <button @click="addBookFromCart(book)" id="add-cart-{{ book.id }}">
          <span class="material-icons">shopping_cart</span>
        </button>
        <button @click="router().push({name: 'editBookForm', params: {id: book.id}})" id="edit-{{ book.id }}">
          <span class="material-icons">edit</span>
        </button>
        <button @click="delBook(book)" id="remove-{{ book.id }}">
          <span class="material-icons">delete</span>
        </button>
      </div>
    </book-item>
  </div>
</template>

<style scoped>
#list {
  background-color: #f5f5f5;
  padding: 20px;
  margin: 0 auto;
  width: 80%;
}

#list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

h1 {
  font-size: 2em;
  margin-top: 0;
}

h2 {
  font-size: 1.5em;
}

button {
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  background-color: #ccc;
  color: #333;
  transition: all 0.3s ease;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


</style>