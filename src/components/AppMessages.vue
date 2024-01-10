<script>
import store from "../store/"
import { computed } from 'vue'

export default {
  computed: {
    todos() {
      return store.state.todos;
    }
  },
  methods: {
    closeAlert(item) {
      this.visible = false;
      store.method.delBook(item);
    }
  },
}
</script>

<template>
  <div id="message">
      <div v-for="item in todos" class="alert alert-danger alert-dismissible" >
        {{ item.message }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" @click="closeAlert(item)">X</button>
      </div>
  </div>
</template>

<style scoped>
#message {
  background-color: #f2f2f2;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
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
</style>
