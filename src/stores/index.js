import { defineStore } from 'pinia'
import TiposRepository from '../repositories/tipos.repository.js'

export const useStore = defineStore('store', {
  state() {
    return {
      messages: [],
      tipos: [],
    }
  },

  getters: {
    getTipoByCode: (state) => (code) => state.tipos.find((item) => item.cod === code) || {},
  },

  actions: {
    getTipoFromFormat(code){
      return `<span class="material-symbols-outlined">${(this.tipos.find((item) => item.cod === code) || {}).icono}</span>`;
    },
    setMessageAction(newValue) {
      if (this.debug) console.log('setMessageAction triggered with ', newValue)
      this.messages.push(newValue)
    },
    clearMessageAction(index) {
      if (this.debug) console.log('clearMessageAction triggered with ', index)
      this.messages.splice(index, 1)
    },
    async loadTipos() {
      const repository = new TiposRepository()
      try {
        this.tipos = await repository.getAllTipos()
      } catch (error) {
        this.setMessageAction(error.message)
      }
    }
  }
})
