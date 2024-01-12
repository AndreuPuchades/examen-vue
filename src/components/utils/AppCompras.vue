<script>
import { useCounterStore } from '@/stores/index.js'
import BookItem from '@/components/utils/BookItem.vue'
import { mapState } from 'pinia'
import SalesRepository from '@/repositories/sales.repository.js'
import SaleItem from '@/components/utils/SaleItem.vue'

export default {
  data() {
    return {
      sales: [],
    };
  },
  components: { SaleItem },
  computed: {
    ...mapState(useCounterStore, {
      cart: 'cart',
    })
  },
  created() {
    this.loadSales();
  },
  methods:{
    deleteBookFromSale(idBook){
      try{
        const salesRepository = new SalesRepository();
        salesRepository.removeSaleByIdBook(idBook);
        useCounterStore().addMessage("Se ha devuelto el libro con id \"" + idBook + "\"");
        this.$router.push("/");
      } catch (error){
        useCounterStore().addMessage(error);
      }
    },
    async loadSales() {
      try {
        const salesRepository = new SalesRepository();
        this.sales = await salesRepository.getSalesByIdUser(1);
      } catch (error) {
        useCounterStore().addMessage(error);
      }
    }
  }
}
</script>

<template>
  <div id="carrito">
    <h1>Libros Comprados</h1>
    <div v-if="sales.length > 0" id="carrito-list">
      <sale-item v-for="sale in sales" :sale="sale" :key="sale.id">
        <div>
          <button @click="deleteBookFromSale(sale.id)" :id="'remove-cart-' + sale.id">
            <span class="material-icons">remove_shopping_cart</span>
          </button>
        </div>
      </sale-item>
    </div>
    <div v-else>
      <h2>Aun no has comprado libros</h2>
    </div>
  </div>
</template>

<style scoped>
#carrito {
  background-color: #f5f5f5;
  padding: 20px;
  margin: 0 auto;
  width: 80%;
}

#carrito-list {
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

button[type='submit']:hover,
button[type='reset']:hover {
  background-color: #555;
}
</style>