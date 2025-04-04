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
/* Container principal */
.settings-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f4f4f4;
  min-height: 100vh;
}

.settings-content {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Títulos */
h1 {
  color: #333;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

p {
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
}

h3 {
  color: #444;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

/* Seções */
.settings-section {
  margin-bottom: 2rem;
}

/* Labels e Inputs */
label {
  display: block;
  margin: 12px 0 4px;
  font-weight: 500;
  color: #333;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border 0.3s;
}

input:focus {
  outline: none;
  border-color: #5c6bc0;
}

/* Botão de salvar */
button {
  width: 100%;
  padding: 12px;
  background-color: #5c6bc0;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3f4e8c;
}

/* Switch de Modo Escuro */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
  margin-top: 10px;
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
  border-radius: 34px;
}

.slider::before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider::before {
  transform: translateX(24px);
}

/* Modo escuro */
.dark {
  background-color: #1e1e1e;
  color: white;
}

.dark .settings-content {
  background-color: #2a2a2a;
}

.dark h1,
.dark h3,
.dark label {
  color: white;
}

.dark input {
  background-color: #444;
  color: white;
  border: 1px solid #666;
}

.dark input::placeholder {
  color: #ccc;
}

/* Responsividade */
@media (max-width: 600px) {
  .settings-container {
    padding: 1rem;
  }

  .settings-content {
    padding: 1.5rem;
  }

  h1 {
    font-size: 1.6rem;
  }

  input {
    font-size: 15px;
  }

  button {
    font-size: 15px;
    padding: 10px;
  }
}
</style>