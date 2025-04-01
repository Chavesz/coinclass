<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" placeholder="Digite seu e-mail" required />
        </div>

        <div class="input-group">
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="password" placeholder="Digite sua senha" required />
        </div>

        <button type="submit" class="login-btn">Entrar</button>
      </form>
      <p class="signup-link">Ainda não tem uma conta? <router-link to="/Appregister">Cadastre-se</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      console.log('Login com', this.email, this.password);
      // Faça a chamada para o backend para autenticar o usuário
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
  background-color: #f0f2f5;
}

/* Container centralizado */
.login-container {
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
