<script>
import AppFooter from '@/components/AppFooter.vue'
import AppMenu from '@/components/AppMenu.vue'
import AppMessages from '@/components/AppMessages.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    AppMessages,
    AppMenu,
    AppFooter,
  }
})
</script>

<template>
  <header>
    <h1>BatoiBooks</h1>
  </header>

  <AppMenu></AppMenu>
  <AppMessages></AppMessages>
  <AppFooter></AppFooter>
</template>

<style>
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

.logo {
  width: 100px;
  height: auto;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
}

.oculto {
  display: none !important;
}

span.error {
  color: red;
  font-weight: bold;
}
</style>
