<script>
import BooksRepository from '@/repositories/books.repository.js'
import { mapState } from 'pinia';
import { useCounterStore } from '../../stores/index.js';

let bookDefault = {
    idModule: '',
    publisher: '',
    price: 0,
    pages: 0,
    status: '',
    comments: '',
  };

export default {
  props: ['id'],
  data() {
    return {
      book: bookDefault,
    }
  },
  mounted() {
    if(this.id){
      this.loadBook();
    } else {
      this.book = bookDefault;
    }
  },
  computed: {
    ...mapState(useCounterStore, {
      modules: 'modules',
    })
  },
  methods: {
    addMessage(text){
      useCounterStore().addMessage(text);
    },
    async loadBook() {
      try {
        const booksRepository = new BooksRepository();
        this.book = await booksRepository.getBookById(this.id);
      } catch (error) {
        this.addMessage(error);
      }
    },
    async submitForm() {
      try {
        const booksRepository = new BooksRepository();
        if (this.isEditing()) {
          await booksRepository.changeBook(this.book);
          useCounterStore().addMessage("Se ha editado el libro con editorial \"" + this.book.publisher + "\"");
          this.$router.push("/");
        } else {
          await booksRepository.addBook(this.book);
          useCounterStore().addMessage("Se ha añadido el libro con editorial \"" + this.book.publisher + "\"");
          this.$router.push('/');
        }
        this.resetForm();
      } catch (error) {
        this.addMessage(error);
      }
    },
    isEditing() {
      return !!this.id;
    },
    resetForm() {
      if(this.isEditing()){
        this.loadBook();
      } else {
        this.book = bookDefault;
      }
    },
  }
};
</script>

<template>
  <div id="form">
    <form id="bookForm" @submit.prevent="submitForm" novalidate>
      <div>
        <label for="id-module">Módulo:</label>
        <select name="id-module" v-model="book.idModule" required>
          <option value="" disabled>- Selecciona un módulo -</option>
          <option v-for="module in modules" :key="module.code" :value="module.code">
            {{ module.cliteral }}
          </option>
        </select>
        <br />
        <span class="error">{{  }}</span>
        <br />
      </div>

      <div id="editorial">
        <label for="publisher">Editorial:</label>
        <input type="text" v-model="book.publisher" class="publisher" required />
        <br />
        <span class="error">{{  }}</span>
      </div>

      <div id="precio">
        <label for="price">Precio:</label>
        <input type="number" v-model="book.price" min="0" step="0.01" required />
        <br />
        <span class="error">{{  }}</span>
      </div>

      <div id="paginas">
        <label for="pages">Páginas:</label>
        <input type="number" v-model="book.pages" min="0" required />
        <br />
        <span class="error">{{  }}</span>
      </div>

      <div id="status">
        <label id="estado">Estado:&nbsp&nbsp&nbsp</label>
        <label id="new" name="status">New</label>
        <input type="radio" v-model="book.status" name="status" value="new" />
        <label id="bad" name="status">Bad</label>
        <input type="radio" v-model="book.status" name="status" value="bad" />
        <label id="usado" name="status">Usado</label>
        <input type="radio" v-model="book.status" name="status" value="usado" />
        <br />
        <span class="error">{{  }}</span>
      </div>

      <div id="comentarios">
        <label for="comments">Comentario:</label>
        <input type="text" v-model="book.comments" class="comments" />
        <br />
        <span class="error">{{  }}</span>
      </div>
      <input type="hidden" v-model="book.id" />
      <br />

      <button type="submit">{{ isEditing ? 'Guardar' : 'Añadir' }}</button>
      <button type="reset" @click="resetForm">Reset</button>
    </form>
  </div>
</template>

<style scoped>
#bookForm {
  background-color: #f5f5f5;
  padding: 20px;
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #333;
}

input,
textarea {
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
}

#status {
  display: flex;
  align-items: center;
}

#status input[type='radio'] {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid #333;
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
}

button[type='submit'],
button[type='reset'] {
  padding: 12px 25px;
  border: none;
  cursor: pointer;
  background-color: #333;
  color: #fff;
  transition: background-color 0.3s ease;
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

button[type='submit']:hover,
button[type='reset']:hover {
  background-color: #555;
}

select[name='id-module'] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

select[name='id-module'] option {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 14px;
}
</style>