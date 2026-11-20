<template>
  <div class="settings">
    <div class="page-head">
      <div>
        <h1>Configurações</h1>
        <p>Perfil, aparência e dados.</p>
      </div>
    </div>

    <form class="card section" @submit.prevent="saveProfile">
      <div class="card-title">Perfil</div>
      <div class="field">
        <label for="s-name">Nome</label>
        <input id="s-name" v-model.trim="name" class="input" required autocomplete="name" />
      </div>
      <div class="field">
        <label for="s-email">E-mail</label>
        <input id="s-email" v-model.trim="email" class="input" type="email" autocomplete="email" placeholder="voce@email.com" />
      </div>
      <div><button class="btn btn-primary" type="submit">Salvar perfil</button> <span v-if="saved" class="muted ok">Salvo!</span></div>
    </form>

    <div class="card section">
      <div class="card-title">Aparência</div>
      <div class="themes">
        <button v-for="t in themes" :key="t.v" class="theme" :class="{ on: state.theme === t.v }" @click="setTheme(t.v)">
          <i :class="['fa-solid', t.icon]"></i>{{ t.l }}
        </button>
      </div>
    </div>

    <div class="card section">
      <div class="card-title">Dados</div>
      <p class="muted">Os dados ficam salvos só neste navegador (localStorage).</p>
      <div class="data-actions">
        <button class="btn btn-ghost" @click="exportCsv"><i class="fa-solid fa-file-csv"></i>Exportar CSV</button>
        <button class="btn btn-ghost" @click="reset"><i class="fa-solid fa-rotate"></i>Restaurar exemplo</button>
        <button class="btn btn-danger" @click="clear"><i class="fa-solid fa-trash"></i>Apagar transações</button>
      </div>
    </div>
  </div>
</template>

<script>
import { state, store } from '@/store'

export default {
  data: () => ({
    state,
    name: state.user.name,
    email: state.user.email,
    saved: false,
    themes: [{ v: 'light', l: 'Claro', icon: 'fa-sun' }, { v: 'dark', l: 'Escuro', icon: 'fa-moon' }, { v: 'system', l: 'Sistema', icon: 'fa-desktop' }]
  }),
  methods: {
    setTheme(t) { store.setTheme(t) },
    saveProfile() {
      store.setUser({ name: this.name, email: this.email })
      this.saved = true
      setTimeout(() => { this.saved = false }, 2000)
    },
    reset() {
      if (confirm('Substituir tudo pelos dados de exemplo?')) {
        store.reset()
        this.name = state.user.name
        this.email = state.user.email
      }
    },
    clear() {
      if (confirm('Apagar todas as transações? Isso não pode ser desfeito.')) store.clear()
    },
    exportCsv() {
      const rows = [['data', 'descricao', 'categoria', 'tipo', 'valor']]
      state.transactions.forEach(t => {
        const c = store.category(t.categoryId)
        rows.push([t.date, t.description, c ? c.name : '', t.type === 'income' ? 'receita' : 'despesa', t.amount.toFixed(2)])
      })
      const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n')
      const a = document.createElement('a')
      a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv' }))
      a.download = 'coinclass-transacoes.csv'
      a.click()
    }
  }
}
</script>

<style scoped>
.settings { max-width: 720px; }
.section { display: flex; flex-direction: column; gap: 14px; margin-bottom: 16px; }
.ok { margin-left: 8px; font-weight: 600; }
.themes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.theme { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px 8px; border-radius: 12px; border: 1px solid var(--border); background: var(--surface-2); font-weight: 600; cursor: pointer; color: var(--muted); }
.theme i { font-size: 1.2rem; }
.theme.on { border-color: var(--accent); background: var(--accent-soft); color: var(--text); }
.data-actions { display: flex; flex-wrap: wrap; gap: 8px; }
</style>
