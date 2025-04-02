<template>
  <div>
    <nav :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">
      <button class="toggle-btn" @click="toggleSidebar">
        <span v-if="isCollapsed">☰</span>
        <span v-else>✖</span>
      </button>
      
      <ul>
        <li><router-link to="/">🏠 Home</router-link></li>
        <li><router-link to="/Appregister">📝 Cadastrar</router-link></li>
        <li><router-link to="/Appdashboard">📊 Dashboard</router-link></li>
        <li><router-link to="/Apptransactions">💰 Transações</router-link></li>
        <li><router-link to="/Appcategories">📂 Categorias</router-link></li>
        <li><router-link to="/Appreports">📈 Relatórios</router-link></li>
        <li><router-link to="/Appsettings">⚙️ Configurações</router-link></li>
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
/* Sidebar */
.sidebar {
  width: 260px;
  height: 100vh;
  background-color: #1a1a1a;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  transition: width 0.3s ease;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.2);
}

.sidebar-collapsed {
  width: 100px;
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
}

.toggle-btn:hover {
  background: #e68900;
}

/* Logo */
.logo {
  margin-bottom: 20px;
  text-align: center;
}

.logo-img {
  width: 140px;
  height: auto;
}

/* Links de navegação */
ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

li {
  width: 100%;
  margin: 10px 0;
}

router-link {
  display: block;
  width: 100%;
  padding: 14px;
  text-decoration: none;
  color: white;
  transition: background 0.3s;
  white-space: nowrap;
  font-size: 18px;
}

router-link:hover {
  background: #ff9800;
  color: black;
  padding-left: 20px;
  transition: 0.3s;
}
</style>