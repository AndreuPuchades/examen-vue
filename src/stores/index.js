import { defineStore } from 'pinia'
import ModulesRepository from '@/repositories/modules.repository.js'

export const useCounterStore = defineStore("counter", {
  state(){
    return{
      messages: [],
      modules: [],
      cart: JSON.parse(localStorage.getItem('cart')) || [],
    }
  },
  actions: {
    addMessage(text){
      this.messages.push(text);
    },
    deleteMessage(text){
      this.messages = this.messages.filter((item) => item !== text);
    },
    addBookFromCart(book){
      if(this.cart.find((item) => item.id === book.id)){
        this.addMessage("No se ha añadido el libro con id \"" + book.id + "\" a la cesta, por que ya esta añadido");
      } else {
        this.cart.push(book);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.addMessage("Se ha añadido el libro con id \"" + book.id + "\" a la cesta");
      }
    },
    deleteBookFromCart(idBook) {
      this.cart = this.cart.filter((item) => item.id !== idBook);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    clearCart(){
      this.cart = [];
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    async loadModules() {
      const repositoryModules = new ModulesRepository();
      this.modules = await repositoryModules.getAllModules();
    }
  },
  getters: {
    getModuleById: (state) => (code) => state.modules.find((item) => item.code === code),
  }
});