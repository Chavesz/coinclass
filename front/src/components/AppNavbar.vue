<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/Applogin">Login</router-link>
    <router-link to="/Appregister">Cadastrar</router-link>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar'
}
</script>

<style scoped>
nav {
  display: flex;
  gap: 20px;
  background-color: #333;
  padding: 10px;
}
router-link {
  color: white;
  text-decoration: none;
}
</style>