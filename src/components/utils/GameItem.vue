<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/index.js'

export default {
  props: {
    juego: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(useStore, ['getCategoriaByCode', 'getPlataformaByCode']),
  },
}
</script>

<template>
    <tr>
      <td>{{ juego.img }}</td>
      <th>{{ juego.id }}</th>
      <th>{{ juego.nombre }}</th>
      <th>{{ juego.descrip }}</th>
      <th>{{ this.getPlataformaByCode(juego.plataforma).nombre }}</th>
      <th>{{ this.getCategoriaByCode(juego.categoria).nombre }}</th>
      <th><slot><button></button></slot></th>
    </tr>
</template>

<style scoped>
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
  background-color: #bbb;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
