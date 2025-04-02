<template>
  <div>
    <nav :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">
      <button class="toggle-btn" @click="toggleSidebar">
        {{ isCollapsed ? '➡️' : '⬅️' }}
      </button>
      
      <div v-if="!isCollapsed" class="logo">
        <img src="/coinclass.png" alt="CoinClass Logo" class="logo-img">
      </div>

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
  width: 250px;
  height: 100vh;
  background-color: #333;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  transition: width 0.3s ease;
}

/* Sidebar recolhida */
.sidebar-collapsed {
  width: 70px;
}

/* Botão recolher/expandir */
.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
}

.sidebar-collapsed .toggle-btn {
  transform: rotate(180deg);
}

/* Logo */
.logo {
  margin-bottom: 20px;
  text-align: center;
}

.logo-img {
  width: 120px;
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
  padding: 12px;
  text-decoration: none;
  color: white;
  transition: background 0.3s;
  white-space: nowrap;
}

router-link:hover {
  background: #444;
  border-left: 4px solid #5c6bc0;
  padding-left: 16px;
}
</style>
