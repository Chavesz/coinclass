<template>
  <div class="layout">
    <!-- Cabeçalho fixo -->
    <header class="header">
      <div class="logo-container">
        <img src="/coinclass.png" alt="CoinClass Logo" class="logo-img">
        <h1>CoinClass</h1>
      </div>
    </header>
    
    <!-- Barra lateral -->
    <nav :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">
      <button class="toggle-btn" @click="toggleSidebar">
        <span v-if="isCollapsed">☰</span>
        <span v-else>✖</span>
      </button>
      
      <ul class="nav-list">
        <li><router-link to="/" class="nav-button">🏠 Home</router-link></li>
        <li><router-link to="/Appregister" class="nav-button">📝 Cadastrar</router-link></li>
        <li><router-link to="/Appdashboard" class="nav-button">📊 Dashboard</router-link></li>
        <li><router-link to="/Apptransactions" class="nav-button">💰 Transações</router-link></li>
        <li><router-link to="/Appcategories" class="nav-button">📂 Categorias</router-link></li>
        <li><router-link to="/Appreports" class="nav-button">📈 Relatórios</router-link></li>
        <li><router-link to="/Appsettings" class="nav-button">⚙️ Configurações</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppSidebar",
  data() {
    return {
      isCollapsed: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    }
  }
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

/* Sidebar */
.sidebar {
  width: 260px;
  height: 100vh;
  background-color: #1a1a1a;
  color: white;
  position: fixed;
  top: 60px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  transition: width 0.3s ease-in-out;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
}

.sidebar-collapsed {
  width: 95px;
}

/* Botão recolher/expandir */
.toggle-btn {
  background: #ff9800;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: background 0.3s ease;
  margin-bottom: 20px;
}

.toggle-btn:hover {
  background: #e68900;
}

/* Links de navegação */
.nav-list {
  list-style: none;
  padding: 0;
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

li {
  width: 100%;
}

.nav-button {
  display: block;
  width: 90%;
  padding: 12px;
  margin: 0 auto;
  text-decoration: none;
  color: white;
  background: #333;
  text-align: center;
  font-size: 18px;
  border-radius: 8px;
  transition: background 0.3s, transform 0.2s;
}

.nav-button:hover {
  background: #ff9800;
  color: black;
  transform: scale(1.05);
}
</style>
