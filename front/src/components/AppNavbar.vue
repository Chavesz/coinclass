<template>
  <nav>
  <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/">Login</router-link></li>
      <li><router-link to="/Appregister">Cadastrar</router-link></li>
      <li><router-link to="/Appdashboard">Dashboard</router-link></li>
      <li><router-link to="/Apptransactions">Transações</router-link></li>
      <li><router-link to="/Appcategories">Categorias</router-link></li>
      <li><router-link to="/Appreports">Relatórios</router-link></li>
      <li><router-link to="/Appsettings">Configurações</router-link></li>
    </ul>
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