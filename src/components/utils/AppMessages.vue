<script>
import { mapState } from 'pinia'
import { useCounterStore } from '@/stores/index.js'

export default {
  computed: {
    ...mapState(useCounterStore, {
      messages: 'messages',
    })
  },
  methods: {
    closeAlert(text) {
      useCounterStore().deleteMessage(text);
    }
  },
}
</script>

<template>
  <div id="message">
      <div v-for="message in messages" class="alert alert-danger alert-dismissible" >
        {{ message }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" @click="closeAlert(message)">
          <span class="material-icons">close</span>
        </button>
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
