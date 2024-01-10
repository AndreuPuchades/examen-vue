import { defineStore } from 'pinia'

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
    getModuleByCode: (state) => (code) => this.state.modules.filter((item) => item.code === code),
  }
});