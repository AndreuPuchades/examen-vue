import { defineStore, mapActions } from 'pinia'

export const useCounterStore = defineStore("counter", {
  state(){
    return{
      messages: [],
      modules: [],
      cart: []
    }
  },
  actions: {
    setMessageAction(newValue){

    },
    clearMessageAction(){

    },
    loadModules(){

    }
  },
  getters: {
    getModuleByCode: (state) => (code) => this.modules.find((item) => item.code === code);
  }
});