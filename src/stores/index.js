import { defineStore } from 'pinia'
import PlataformasRepository from '@/repositories/plataformas.repository.js'
import CategoriasRepository from '@/repositories/categorias.repository.js'

export const useStore = defineStore('store', {
  state() {
    return {
      categorias: [],
      plataformas: [],
      cart: JSON.parse(localStorage.getItem('pedidos')) || [],
    }
  },

  getters: {
    getCategoriaByCode: (state) => (id) => state.categorias.find((item) => item.id === id) || {},
    getPlataformaByCode: (state) => (id) => state.plataformas.find((item) => item.id === id) || {},
  },

  actions: {
    async loadCategorias() {
      const repository = new CategoriasRepository()
      try {
        this.categorias = await repository.getAllCategorias()
      } catch (error) {
        alert(error.message)
      }
    },
    async loadPlataformas() {
      const repository = new PlataformasRepository()
      try {
        this.plataformas = await repository.getAllPlataforma()
      } catch (error) {
        alert(error.message)
      }
    },
    addJuegoFromCart(juego){
      if(this.cart.find((item) => item.id === juego.id)){
        this.sumarOrder(juego);
        alert("Se ha sumado un juego con id \"" + juego.id + "\" a la cesta, por que ya se habia añadido");
      } else {
        const newOrder = {img: juego.img, id: juego.id, nombre: juego.nombre, plataforma: juego.plataforma, unidades : 1};
        this.cart.push(newOrder);
        localStorage.setItem('pedidos', JSON.stringify(this.cart));
        alert("Se ha añadido el juego con id \"" + juego.id + "\" a la cesta");
      }
    },
    deleteJuegoFromCart(idJuego) {
      this.cart = this.cart.filter((item) => item.id !== idJuego);
      localStorage.setItem('pedidos', JSON.stringify(this.cart));
    },
    sumarOrder(juego){
      const newCart = [];
      this.cart.forEach(function(item) {
        if(item.id === juego.id){
          newCart.push({img: juego.img, id: juego.id, nombre: juego.nombre, plataforma: juego.plataforma, unidades : (item.unidades + 1)})
        } else {
          newCart.push(item);
        }
      });

      this.cart = newCart;
      localStorage.setItem('pedidos', JSON.stringify(this.cart));
    },
    restarOrder(juego){
      const newCart = [];
      this.cart.forEach(function(item) {
        if(item.id === juego.id){
          if(item.unidades > 1){
            newCart.push({img: juego.img, id: juego.id, nombre: juego.nombre, plataforma: juego.plataforma, unidades : (item.unidades - 1)})
          }
        } else {
          newCart.push(item);
        }
      });

      this.cart = newCart;
      localStorage.setItem('pedidos', JSON.stringify(this.cart));
    }
  }
})