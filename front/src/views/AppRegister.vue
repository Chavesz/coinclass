<template>
  <div class="Appregister">
    <h1>Cadastrar</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="name">Nome</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Senha</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
    <p>Já tem uma conta? <router-link to="/">Entrar</router-link></p>
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
/* Estilos para a página de cadastro */
</style>
