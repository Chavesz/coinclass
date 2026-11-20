<template>
  <div class="auth">
    <section class="hero">
      <div class="brand"><span class="logo"><i class="fa-solid fa-coins"></i></span><span>CoinClass</span></div>
      <div>
        <h1>Suas finanças pessoais, organizadas e claras.</h1>
        <p>Registre receitas e despesas, separe por categorias e acompanhe tudo em gráficos.</p>
      </div>
      <ul>
        <li><i class="fa-solid fa-check"></i>Painel com saldo do mês</li>
        <li><i class="fa-solid fa-check"></i>Categorias personalizáveis</li>
        <li><i class="fa-solid fa-check"></i>Relatórios e exportação CSV</li>
      </ul>
    </section>

    <section class="panel">
      <form class="box" @submit.prevent="enter">
        <h2>{{ isLogin ? 'Entrar' : 'Criar conta' }}</h2>
        <p class="muted">Demonstração: os dados ficam salvos só neste navegador.</p>
        <div v-if="!isLogin" class="field">
          <label for="a-name">Nome</label>
          <input id="a-name" v-model.trim="name" class="input" required autocomplete="name" />
        </div>
        <div class="field">
          <label for="a-email">E-mail</label>
          <input id="a-email" v-model.trim="email" class="input" type="email" required autocomplete="email" placeholder="voce@email.com" />
        </div>
        <div class="field">
          <label for="a-pass">Senha</label>
          <input id="a-pass" v-model="pass" class="input" type="password" minlength="4" required :autocomplete="isLogin ? 'current-password' : 'new-password'" />
        </div>
        <button class="btn btn-primary" type="submit">{{ isLogin ? 'Entrar' : 'Criar conta' }}</button>
        <router-link to="/" class="btn btn-ghost">Explorar sem conta</router-link>
        <p class="switch muted">
          <template v-if="isLogin">Não tem conta? <router-link to="/cadastro">Cadastre-se</router-link></template>
          <template v-else>Já tem conta? <router-link to="/entrar">Entrar</router-link></template>
        </p>
      </form>
    </section>
  </div>
</template>

<script>
import { store } from '@/store'

export default {
  data: () => ({ name: '', email: '', pass: '' }),
  computed: { isLogin() { return this.$route.meta.mode === 'login' } },
  methods: {
    enter() {
      const name = this.isLogin ? this.email.split('@')[0] : this.name
      store.setUser({ name, email: this.email })
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.auth { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; }
.hero { background: radial-gradient(circle at 20% 10%, rgba(245,158,11,.35), transparent 50%), #10141d; color: #fff; padding: 48px; display: flex; flex-direction: column; justify-content: space-between; gap: 32px; }
.brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.2rem; }

.hero h1 { font-size: 2.5rem; line-height: 1.1; letter-spacing: -.03em; max-width: 14ch; }
.hero p { color: rgba(255,255,255,.7); margin-top: 16px; max-width: 42ch; line-height: 1.6; }
.hero ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; color: rgba(255,255,255,.85); }
.hero li i { color: #fbbf24; margin-right: 10px; }
.panel { display: grid; place-items: center; padding: 32px 16px; }
.box { width: 100%; max-width: 380px; display: flex; flex-direction: column; gap: 14px; }
.box h2 { font-size: 1.75rem; font-weight: 800; letter-spacing: -.02em; }
.switch { text-align: center; font-size: .9rem; }
.switch a { color: var(--text); font-weight: 700; }
@media (max-width: 860px) {
  .auth { grid-template-columns: 1fr; }
  .hero { padding: 28px 16px; gap: 20px; }
  .hero h1 { font-size: 1.8rem; }
  .hero ul { display: none; }
}
</style>
