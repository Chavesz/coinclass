<template>
  <div class="settings-container" :class="{ dark: darkMode }">
    <AppNavbar />

    <div class="settings-content">
      <h1>Configurações</h1>
      <p>Ajustes da conta, perfil e preferências.</p>

      <!-- Informações do Usuário -->
      <div class="settings-section">
        <h3>Perfil</h3>
        <label>Nome:</label>
        <input type="text" v-model="user.name" />

        <label>Email:</label>
        <input type="email" v-model="user.email" />
      </div>

      <!-- Alteração de Senha -->
      <div class="settings-section">
        <h3>Alterar Senha</h3>
        <input type="password" v-model="user.password" placeholder="Nova senha" />
      </div>

      <!-- Modo Escuro -->
      <div class="settings-section">
        <h3>Modo Escuro</h3>
        <label class="switch">
          <input type="checkbox" v-model="darkMode" />
          <span class="slider round"></span>
        </label>
      </div>

      <!-- Botão de Salvar -->
      <button @click="saveSettings">Salvar Alterações</button>
    </div>
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  components: { AppNavbar },
  data() {
    return {
      user: {
        name: "Kauã Chaves",
        email: "kaua@example.com",
        password: ""
      },
      darkMode: false
    };
  },
  methods: {
    saveSettings() {
      console.log("Configurações salvas:", this.user, "Modo Escuro:", this.darkMode);
      alert("Configurações salvas com sucesso!");
    }
  }
};
</script>

<style scoped>
/* Estilização Geral */
.settings-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: #f4f4f4;
  min-height: 100vh;
}

.settings-content {
  width: 90%;
  max-width: 400px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Seções */
.settings-section {
  margin: 20px 0;
}

h1 {
  color: #333;
  text-align: center;
}

h3 {
  margin-bottom: 10px;
  color: #555;
}

label {
  display: block;
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #5c6bc0;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #3f4e8c;
}

/* Switch do Modo Escuro */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
}

.slider::before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4CAF50;
}

input:checked + .slider::before {
  transform: translateX(26px);
}

/* Modo Escuro */
.dark {
  background-color: #222;
  color: white;
}

.dark .settings-content {
  background: #333;
}

.dark h1,
.dark h3 {
  color: white;
}

.dark input {
  background: #555;
  color: white;
  border: 1px solid #777;
}
</style>
