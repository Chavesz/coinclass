<template>
  <div class="layout">
    <!-- Cabeçalho fixo com navegação -->
    <header class="header">
      <div class="logo-container">
        <img src="/coinclass.png" alt="CoinClass Logo" class="logo-img">
        <h1>CoinClass</h1>
      </div>
      <nav class="nav-menu">
      <router-link to="/">🏠 Visão Geral</router-link>
      <router-link to="/Appdashboard">📊 Dashboard</router-link>
      <router-link to="/AppCategories">🏷️ Categorias</router-link>
      <router-link to="/Apptransactions">💰 Transações</router-link>
      <router-link to="/Appsettings">⚙️ Configurações</router-link>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
/* Layout principal */
.layout {
  display: flex;
  flex-direction: column;
}

/* Cabeçalho */
.header {
  width: 100%;
  height: 60px;
  background-color: #1a1a1a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 40px;
  height: auto;
  margin-right: 10px;
}

h1 {
  font-size: 20px;
  font-weight: bold;
  color: #ff9800;
}

/* Menu de navegação */
.nav-menu {
  display: flex;
  gap: 20px;
}

.nav-menu a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  padding: 10px;
  transition: background 0.3s, color 0.3s;
  border-radius: 4px;
}

.nav-menu a:hover {
  background: #ff9800;
  color: black;
}
</style>


