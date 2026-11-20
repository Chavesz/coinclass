<template>
  <div id="app">
    <router-view v-if="$route.meta.bare" />
    <div v-else class="shell">
      <aside class="sidebar">
        <router-link to="/" class="brand">
          <span class="logo"><i class="fa-solid fa-coins"></i></span>
          <span>CoinClass</span>
        </router-link>
        <nav>
          <router-link v-for="l in links" :key="l.to" :to="l.to" exact-active-class="active">
            <i :class="['fa-solid', l.icon]"></i>{{ l.label }}
          </router-link>
        </nav>
        <div class="side-foot">
          <router-link to="/entrar" class="user">
            <span class="avatar">{{ initials }}</span>
            <span><strong>{{ state.user.name }}</strong><small>Modo demonstração</small></span>
          </router-link>
        </div>
      </aside>

      <div class="main">
        <header class="topbar">
          <router-link to="/" class="brand mobile-only">
            <span class="logo"><i class="fa-solid fa-coins"></i></span><span>CoinClass</span>
          </router-link>
          <span class="top-title desktop-only">{{ $route.meta.title }}</span>
          <div class="top-actions">
            <button class="icon-btn" :aria-label="dark ? 'Usar tema claro' : 'Usar tema escuro'" @click="toggleTheme">
              <i :class="['fa-solid', dark ? 'fa-sun' : 'fa-moon']"></i>
            </button>
            <router-link to="/transacoes?nova=1" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-plus"></i><span class="desktop-only">Nova transação</span>
            </router-link>
          </div>
        </header>
        <main class="content">
          <router-view />
        </main>
      </div>

      <nav class="bottom-nav">
        <router-link v-for="l in links" :key="l.to" :to="l.to" exact-active-class="active">
          <i :class="['fa-solid', l.icon]"></i><span>{{ l.short }}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import { state, store, applyTheme } from './store'

export default {
  data: () => ({
    state,
    dark: false,
    links: [
      { to: '/', label: 'Visão geral', short: 'Início', icon: 'fa-house' },
      { to: '/transacoes', label: 'Transações', short: 'Transações', icon: 'fa-arrow-right-arrow-left' },
      { to: '/categorias', label: 'Categorias', short: 'Categorias', icon: 'fa-tags' },
      { to: '/relatorios', label: 'Relatórios', short: 'Relatórios', icon: 'fa-chart-pie' },
      { to: '/configuracoes', label: 'Configurações', short: 'Ajustes', icon: 'fa-gear' }
    ]
  }),
  computed: {
    initials() {
      return (state.user.name || '?').split(' ').filter(Boolean).slice(0, 2).map(p => p[0].toUpperCase()).join('')
    }
  },
  created() { this.dark = applyTheme() },
  watch: { 'state.theme'() { this.dark = applyTheme() } },
  methods: {
    toggleTheme() { store.setTheme(this.dark ? 'light' : 'dark') }
  }
}
</script>

<style>
.shell { display: flex; min-height: 100vh; }
.sidebar { width: 248px; flex-shrink: 0; position: sticky; top: 0; height: 100vh; display: flex; flex-direction: column; padding: 20px 14px; border-right: 1px solid var(--border); background: var(--surface); }
.brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.15rem; letter-spacing: -.02em; padding: 4px 8px; }
.brand img { width: 30px; height: 30px; object-fit: contain; }
.sidebar nav { display: flex; flex-direction: column; gap: 2px; margin-top: 28px; }
.sidebar nav a { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 12px; color: var(--muted); font-weight: 600; transition: background .15s, color .15s; }
.sidebar nav a i { width: 18px; text-align: center; }
.sidebar nav a:hover { background: var(--surface-2); color: var(--text); }
.sidebar nav a.active { background: var(--accent-soft); color: var(--text); }
.sidebar nav a.active i { color: var(--accent); }
.side-foot { margin-top: auto; }
.user { display: flex; gap: 10px; align-items: center; padding: 10px; border-radius: 12px; }
.user:hover { background: var(--surface-2); }
.user strong { display: block; font-size: .9rem; }
.user small { color: var(--muted); font-size: .75rem; }
.avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--accent); color: var(--accent-ink); display: grid; place-items: center; font-weight: 800; font-size: .85rem; }

.main { flex: 1; min-width: 0; }
.topbar { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 32px; background: color-mix(in srgb, var(--bg) 85%, transparent); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); }
.top-title { font-weight: 700; color: var(--muted); }
.top-actions { display: flex; align-items: center; gap: 8px; }
.btn-sm { padding: 8px 14px; }
.content { padding: 28px 32px 48px; max-width: 1200px; }

.bottom-nav { display: none; }
.mobile-only { display: none; }

@media (max-width: 860px) {
  .sidebar, .desktop-only { display: none; }
  .mobile-only { display: flex; }
  .topbar { padding: 10px 16px; }
  .content { padding: 20px 16px 96px; }
  .bottom-nav { display: grid; grid-template-columns: repeat(5, 1fr); position: fixed; bottom: 0; left: 0; right: 0; z-index: 20; background: var(--surface); border-top: 1px solid var(--border); padding: 6px 4px calc(6px + env(safe-area-inset-bottom)); }
  .bottom-nav a { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 6px 0; font-size: .68rem; font-weight: 600; color: var(--muted); border-radius: 10px; }
  .bottom-nav a i { font-size: 1.05rem; }
  .bottom-nav a.active { color: var(--text); }
  .bottom-nav a.active i { color: var(--accent); }
}
</style>
