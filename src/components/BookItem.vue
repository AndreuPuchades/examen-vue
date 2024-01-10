<script>
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  methods: {

  }
}
</script>

<template>
  <div :id="'book-' + book.id" class="book">
    <h2>{{ book.publisher }}</h2>
    <h3>Id: {{ book.id }}</h3>
    <h3>Editorial: {{ book.publisher }}</h3>
    <h3>IdModule: {{ book.idModule }}</h3>
    <h3>Precio: {{ book.price }}</h3>
    <h3>Paginas: {{ book.pages }}</h3>
    <h3>Estado: {{ book.status }}</h3>
    <h3>Comentario: {{ book.comments }}</h3>
    <slot><div></div></slot>
  </div>
</template>

<style scoped>
#list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.book {
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #fff;
  text-align: center;
  border-radius: 10px;
}

h2,
h3 {
  margin: 10px 0;
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
