<template>
  <header class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="logo-container">
        <img src="/coinclass.png" alt="CoinClass Logo" class="logo-img">
        <h1>CoinClass</h1>
      </div>

      <!-- Menu de navegação -->
      <nav class="nav-links">
        <ul>
          <li><router-link to="/">🏠 Home</router-link></li>
          <li><router-link to="/Appdashboard">📊 Dashboard</router-link></li>
          <li><router-link to="/Apptransactions">💰 Transações</router-link></li>
          <li><router-link to="/Appsettings">⚙️ Configurações</router-link></li>
        </ul>
      </nav>

      <!-- Botão de menu para mobile -->
      <button class="menu-btn" @click="toggleMenu">
        ☰
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
};
</script>

<style scoped>
/* Estilização do Navbar */
.navbar {
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

/* Container do Navbar */
.navbar-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
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
  font-size: 22px;
  font-weight: bold;
  color: #ff9800;
}

/* Menu de navegação */
.nav-links ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li {
  display: inline;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #ff9800;
}

/* Botão do menu mobile */
.menu-btn {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

/* Responsivo para mobile */
@media (max-width: 768px) {
  .nav-links ul {
    display: none;
  }

  .menu-btn {
    display: block;
  }
}
</style>


