<template>
  <div id="app">
    <AppNavbar />
    <router-view />  <!-- Aqui as páginas são renderizadas -->
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'

export default {
  components: {
    AppNavbar
  }
}
</script>

<style>
/* Adicione seu estilo global aqui */
</style>
