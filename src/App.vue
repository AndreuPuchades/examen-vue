<script>
import AppFooter from '@/components/views/AppFooter.vue'
import AppMenu from '@/components/utils/AppMenu.vue'
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import { useStore } from '@/stores/index.js'

export default defineComponent({
  components: {
    AppMenu,
    AppFooter,
  },
  mounted() {
    this.loadCategorias();
    this.loadPlataformas()
  },
  methods: {
    ...mapActions(useStore, ['loadCategorias', 'loadPlataformas']),
  }
})
</script>

<template>
  <header>
    <h1>BatoiBooks</h1>
  </header>

  <AppMenu></AppMenu>
  <AppFooter></AppFooter>
</template>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css');

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

header {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
}

span.error {
  color: red;
  font-weight: bold;
}
</style>
