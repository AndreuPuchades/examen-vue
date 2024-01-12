<script>
import { useCounterStore } from '@/stores/index.js'
import BooksRepository from '@/repositories/books.repository.js'

export default {
  data (){
    return {
      book : {}
    }
  },
  props: {
    sale: {
      type: Object,
      required: true
    }
  },
  async created() {
    try {
      const bookRepository = new BooksRepository();
      this.book = await bookRepository.getBookById(this.sale.idBook);
    } catch (error) {
      useCounterStore().addMessage(error);
    }
  },
  methods: {
    getModuleById(code){
      const modulo = useCounterStore().getModuleById(code);
      if(modulo){
        return modulo.cliteral;
      } else {
        return "No hay modulo";
      }
    }
  }
}
</script>

<template>
  <div :id="'sale-' + sale.id" class="sale">
    <h2>{{ sale.id }}</h2>
    <h3>Book: ({{ sale.idBook }})</h3>
    <h4>Editorial: {{ book.publisher }}</h4>
    <h4>Module: {{ getModuleById(book.idModule) }}</h4>
    <h4>Precio: {{ book.price }} €</h4>
    <h3>Fecha de venta: {{ sale.date }}</h3>
    <slot><div></div></slot>
  </div>
</template>

<style scoped>
#list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.sale {
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #fff;
  text-align: center;
  border-radius: 10px;
}

h2,
h3 {
  margin: 10px 0;
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

button:hover {
  background-color: #bbb;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
