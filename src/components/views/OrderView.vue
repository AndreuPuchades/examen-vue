<template>
  <div class="row">
      <h1>Juegos a pedir</h1>
      <table class="table table-striped table-hover">
        <thead class="thead-dark">
          <tr>
            <th>Imagen</th>
            <th>Id</th>
            <th>Nombre</th>
            <th>Plataforma</th>
            <th>Uds.</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in cart" :key="order.id">
            <td>{{ order.img }}</td>
            <td>{{ order.id }}</td>
            <td>{{ order.nombre }}</td>
            <td>{{ this.getPlataformaByCode(order.plataforma).nombre }}</td>
            <td>{{ order.unidades }}</td>
            <td>
              <button class="delete" title="Sumar" @click="sumarUnaOrder(order)">
                <span class="material-symbols-outlined">+</span>
              </button>
              <button class="delete" title="Restar" @click="restarUnaOrder(order)">
                <span class="material-symbols-outlined">-</span>
              </button>
              <button class="delete" title="Eliminar" @click="deleteOrder(order)">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    <div>
      <p>Juegos a pedir: {{ this.cart.length }} </p>
      <p>Total de unidades a pedir: {{ totalPedidos()}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useStore } from '@/stores/index.js'

export default {
  computed:{
    ...mapState(useStore, ['cart', 'getPlataformaByCode']),
  },
  methods:{
    ...mapActions(useStore, ['deleteJuegoFromCart', 'sumarOrder', 'restarOrder']),
    deleteOrder(order){
      if(confirm('Seguro que quieres eliminar el pedido con id "' + order.id + '"')){
        this.deleteJuegoFromCart(order.id)
      }
    },
    sumarUnaOrder(order){
      this.sumarOrder(order)
    },
    restarUnaOrder(order){
      this.restarOrder(order)
    },
    totalPedidos(){
      let totalPedidos = 0;
      this.cart.forEach(function(item) {
        totalPedidos += item.unidades;
      });
      return totalPedidos;
    }
  }
}
</script>
