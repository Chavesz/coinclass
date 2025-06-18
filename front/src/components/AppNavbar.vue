<template>
  <div class="layout">
    <!-- Cabeçalho fixo com navegação -->
    <header class="header">
      <div class="logo-container">
        <div class="logo-badge">
          <img src="/coinclass.png" alt="CoinClass Logo" class="logo-img">
        </div>
        <h1><span class="coin">Coin</span><span class="class">Class</span></h1>
      </div>
      <nav class="nav-menu">
        <router-link to="/">
          <i class="fas fa-home"></i> Visão Geral
        </router-link>
        <router-link to="/Appdashboard">
          <i class="fas fa-chart-bar"></i> Dashboard
        </router-link>
        <router-link to="/AppCategories">
          <i class="fas fa-tags"></i> Categorias
        </router-link>
        <router-link to="/Apptransactions">
          <i class="fas fa-exchange-alt"></i> Transações
        </router-link>
        <router-link to="/Appsettings">
          <i class="fas fa-cog"></i> Configurações
        </router-link>
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
  height: 68px;
  background: linear-gradient(90deg, #232526 0%, #35363a 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.18);
  z-index: 1000;
  border-bottom: 2px solid rgba(255,255,255,0.07);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 0;
  height: 58px;
}

.logo-badge {
  background: none;
  box-shadow: none;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo-img {
  width: 44px;
  height: 44px;
  object-fit: contain;
  border-radius: 8px;
  filter: none;
}

h1 {
  font-size: 1.7rem;
  font-weight: 900;
  letter-spacing: 1px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 2px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.10);
  height: 44px;
}

.coin {
  color: #fff;
  font-weight: 900;
  text-shadow: 0 2px 8px #ff980033;
}
.class {
  color: #ff9800;
  font-weight: 900;
  margin-left: 2px;
  text-shadow: 0 2px 8px #ff980033;
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

.nav-menu a i {
  margin-right: 8px;
  font-size: 1.1em;
  vertical-align: middle;
}

@media (max-width: 600px) {
  .header {
    padding: 0 8px;
    height: 54px;
  }
  .logo-badge {
    width: 36px;
    height: 36px;
  }
  .logo-img {
    width: 24px;
    height: 24px;
  }
  h1 {
    font-size: 1.1rem;
  }
  .logo-container {
    gap: 8px;
  }
}
</style>


