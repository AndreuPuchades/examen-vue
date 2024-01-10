import { reactive } from 'vue'

export default{
  debug: true,
  state: reactive({
    todos: [{id: 0, message: "Mensaje de prueba"}]
  }),

  method: {
    addMenssage(menssage){
      this.state.todos.push({id: id++, message: menssage});
    },
    delBook(menssage) {
      this.state.todos = this.state.todos.filter((item) => item.id !== menssage.id)
    }
  }
}
let id = 1;