<template>
  <div class="row">
    <Form novalidate @submit="handleSubmit" @reset="handleReset" :validation-schema="mySchema">
        <fieldset>
          <legend>{{ this.formTitle }}</legend>
          <div class="form-group">
            <label>ID:</label>
            <Field type="text" name="id" v-model="juego.id" class="form-control" disabled/>
          </div>

          <div class="form-group">
            <label>Nombre:</label>
            <Field type="text" name="nombre" v-model="juego.nombre" class="form-control"/>
            <ErrorMessage name="nombre" class="error"/>
          </div>

          <div class="form-group">
            <label>Descripción:</label>
            <Field type="text" name="descrip" v-model="juego.descrip" class="form-control"/>
          </div>

          <div class="form-group">
            <label>Categoria:</label><br>
            <label v-for="categoria in categorias" :key="categoria.id">
              {{ categoria.nombre }}
              <Field type="radio" name="categoria" v-model="juego.categoria" :value="categoria.id"/><br/>
            </label>
            <ErrorMessage name="categoria" class="error"/>
          </div>

          <div class="form-group">
            <label for="idModule">Plataforma:</label>
            <select name="idModule" v-model="juego.plataforma">
              <option value="" disabled>- Selecciona un plataforma -</option>
              <option v-for="plataforma in plataformas" name="plataforma" :key="plataforma.id" :value="plataforma.id">
                {{ plataforma.nombre }}
              </option>
            </select>
            <br />
            <ErrorMessage name="plataforma" class="error"/>
            <br />
          </div>

          <div class="form-group">
            <label>Imagen:</label>
            <Field type="text" name="img" v-model="juego.img" class="form-control"/>
            <ErrorMessage name="img" class="error"/>
          </div>

          <button type="submit" class="btn btn-default btn-primary" @click="this.handleSubmit">Guardar</button>
          <button type="reset"  class="btn btn-danger" @click="this.handleReset">Reset</button>
        </fieldset>
      </form>
  </div>
</template>

<script>
import { useStore } from '@/stores/index.js'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { setLocale } from 'yup'
import JuegosRepository from '@/repositories/juegos.repository.js'
import * as yup from 'yup';
import { mapState } from 'pinia'

setLocale({
  mixed: {
    default: 'Campo no válido',
    required: 'El campo ${path} no puede estar vacío'
  },
  string: {
    min: 'El campo ${path} debe tener al menos ${min} caracteres',
    max: 'El campo del campo debe ser mayor que ${max}'
  },
  number: {
    min: 'El valor del campo debe ser mayor que ${min}',
    max: 'El valor del campo debe ser mayor que ${max}'
  }
});

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { ErrorMessage, Field, Form },
  props:['id'],
  computed: {
    ...mapState(useStore, ['categorias', 'plataformas']),
    editing() {
      return !!this.id
    },
    formTitle() {
      return this.editing
        ? 'Editar Juego'
        : 'Añadir Juego'
    }
  },
  data() {
    const mySchema = yup.object({
      nombre: yup.string().required().min(4).max(25),
      plataforma: yup.string().required(),
      categoria: yup.string().required()
    })
    return {
      juego: {},
      mySchema,
      repository: new JuegosRepository()
    }
  },
  mounted() {
    if (this.editing) {
      this.loadJuego()
    } else {
      this.juego = {}
    }
  },
  methods: {
    async loadJuego() {
      try {
        const response = await this.repository.getJuegoById(this.id);
        this.juego = response;
      } catch (error) {
        useStore().setMessageAction(error.message);
      }
    },
    async handleSubmit() {
      try {
        if (this.editing) {
          await this.repository.changeJuego(this.juego)
        } else {
          await this.repository.addJuego(this.juego)
        }
        this.juego = {}
        this.$router.push('/juegos')
      } catch (error) {
        useStore().setMessageAction(error.message)
      }
    },
    handleReset() {
      if (this.editing) {
        this.loadJuego()
      } else {
        this.contacto = {}
      }
    }
  }
}
</script>

<style scoped></style>
