<template>
  <div class="Appregister">
   <div class="login-box">
    <h1>Cadastrar</h1>
    <form @submit.prevent="handleRegister">

      <div class="input-group">
        <label for="name">Nome</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="input-group">
        <label for="password">Senha</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit" class="login-btn">Cadastrar</button>
    </form>
    <p>Já tem uma conta? <router-link to="/">Entrar</router-link></p>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    handleRegister() {
      console.log('Cadastro com', this.name, this.email, this.password);
      // Faça a chamada para o backend para registrar o usuário
    }
  }
}
</script>

<style scoped>
/* Resetando margens e padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Definindo o fundo da página */
body {
  font-family: 'Arial', sans-serif;
  background-color:rgb(0, 0, 0);
}

/* Container centralizado */
.Appregister {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.input-group input:focus {
  outline: none;
  border-color: #5c6bc0;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #5c6bc0;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #3f4e8c;
}

.signup-link {
  margin-top: 20px;
  font-size: 14px;
}

.signup-link a {
  text-decoration: none;
  color: #5c6bc0;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>
