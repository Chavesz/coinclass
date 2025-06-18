<template>
  <div class="register-container">
    <div class="register-content">
      <div class="register-box">
        <div class="register-header">
          <div class="logo">
            <i class="fas fa-wallet"></i>
            <h1>CoinClass</h1>
          </div>
          <p class="welcome-text">Crie sua conta</p>
        </div>

        <form @submit.prevent="handleRegister" class="register-form">
          <div class="input-group">
            <label for="name">
              <i class="fas fa-user"></i>
              Nome
            </label>
            <input 
              type="text" 
              id="name" 
              v-model="name" 
              placeholder="Digite seu nome completo" 
              required 
            />
          </div>

          <div class="input-group">
            <label for="email">
              <i class="fas fa-envelope"></i>
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              placeholder="Digite seu e-mail" 
              required 
            />
          </div>

          <div class="input-group">
            <label for="password">
              <i class="fas fa-lock"></i>
              Senha
            </label>
            <div class="password-input">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="password" 
                placeholder="Digite sua senha" 
                required 
              />
              <button 
                type="button" 
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <div class="terms-checkbox">
            <label>
              <input type="checkbox" v-model="acceptTerms" required />
              <span>Eu concordo com os <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a></span>
            </label>
          </div>

          <button type="submit" class="register-btn">
            <span>Criar Conta</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </form>

        <div class="register-footer">
          <p class="login-link">
            Já tem uma conta? 
            <router-link to="/">Entrar</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      showPassword: false,
      acceptTerms: false
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
:root {
  --primary-color: #4f46e5;
  --primary-hover: #4338ca;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --background-color: #f9fafb;
  --card-background: #ffffff;
  --border-color: #e5e7eb;
  --error-color: #ef4444;
  --success-color: #22c55e;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color) 0%, #818cf8 100%);
  padding: 1rem;
}

.register-content {
  width: 100%;
  max-width: 420px;
  animation: fadeIn 0.5s ease-out;
}

.register-box {
  background-color: var(--card-background);
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  padding: 2rem;
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.logo i {
  font-size: 2rem;
  color: var(--primary-color);
}

.logo h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
}

.welcome-text {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
}

.input-group label i {
  color: var(--text-secondary);
}

.input-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.input-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
}

.terms-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.terms-checkbox input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  margin-top: 0.25rem;
  border-radius: 0.25rem;
  border: 1px solid var(--border-color);
}

.terms-checkbox a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.terms-checkbox a:hover {
  text-decoration: underline;
}

.register-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.875rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.register-btn:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}

.register-btn:active {
  transform: translateY(0);
}

.register-footer {
  margin-top: 2rem;
  text-align: center;
}

.login-link {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.login-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsividade */
@media (max-width: 480px) {
  .register-box {
    padding: 1.5rem;
  }

  .logo h1 {
    font-size: 1.5rem;
  }

  .welcome-text {
    font-size: 1rem;
  }

  .terms-checkbox {
    font-size: 0.75rem;
  }
}
</style>
