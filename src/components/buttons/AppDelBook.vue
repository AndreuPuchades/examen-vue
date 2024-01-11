<script>
import BooksRepository from '@/repositories/books.repository.js'
import { useCounterStore } from '@/stores/index.js'

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
    addMessage(text){
      const counterStore = useCounterStore();
      counterStore.addMessage(text);
    },
    async delBook() {
      if (confirm("Quieres borrar este libro con id " + this.idBook + " y con modulo " + this.idModule + "?")) {
        try{
          const repository = new BooksRepository();
          await repository.removeBook(this.idBook);
        } catch (error){
          this.addMessage(error);
        }
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
