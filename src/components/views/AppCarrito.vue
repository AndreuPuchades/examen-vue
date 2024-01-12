<script>
import { useCounterStore } from '@/stores/index.js'
import BookItem from '@/components/BookItem.vue'
import { mapState } from 'pinia'
import SalesRepository from '@/repositories/sales.repository.js'

export default {
  data() {
    return {
      sales: [],
    };
  },
  components: { BookItem },
  computed: {
    ...mapState(useCounterStore, {
      cart: 'cart',
    })
  },
  created() {
    this.loadSales();
  },
  methods:{
    deleteBookFromCart(idBook){
      useCounterStore().deleteBookFromCart(idBook);
      useCounterStore().addMessage("Se ha eliminado el libro con id \""+ idBook + "\" del carrito");
    },
    saveCart(){
      try{
        if(this.cart.length > 0){
          const salesRepository = new SalesRepository();
          this.cart.forEach((book) => {
            salesRepository.addSale({"idBook": book.id, "idUser": 1, "date": this.getFechaActualWithFormat(), "status": 0});
          });
          useCounterStore().clearCart();
          useCounterStore().addMessage("La compra de los libros se ha realizado");
          this.$router.push("/compras");
        } else {
          useCounterStore().addMessage("La cesta esta vacia, no se puede realizar la compra");
        }
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
    },
    getTotalPrecio(){
      let precioTotal = 0;
      this.cart.forEach((item) => {
        precioTotal += item.price;
      });

      return precioTotal;
    },
    clearCart(){
      useCounterStore().clearCart();
      useCounterStore().addMessage("Se ha vaciado el carrito correctamente");
      this.$router.push("/");
    },
    getFechaActualWithFormat() {
      const fechaActual = new Date();
      return  fechaActual.getFullYear() + '-' + (fechaActual.getMonth() + 1) + '-' + fechaActual.getDate();
    }
  }
}
</script>

<template>
  <div id="carrito">
    <h1>Carrito</h1>
    <div id="carrito-list">
      <book-item v-for="book in cart" v-bind:book="book">
        <div>
          <button @click="this.deleteBookFromCart(book.id)" id="remove-cart-{{book.id}}">
            <span class="material-icons">remove_shopping_cart</span>
          </button>
        </div>
      </book-item>
    </div>
    <h2>Total Unidades: {{cart.length}}</h2>
    <h2>Total Precio: {{this.getTotalPrecio()}} €</h2>
    <button @click="this.clearCart()" id="remove-cart-{{book.id}}">
      <span class="material-icons">remove_shopping_cart</span>
    </button>
    <button @click="this.saveCart()" id="remove-cart-{{book.id}}">
      <span class="material-icons">shopping_cart_checkout</span>
    </button>
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

button:hover {
  background-color: #555;
}
</style>
