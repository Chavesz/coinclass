<template>
  <div>
    <div class="page-head">
      <div>
        <h1>Categorias</h1>
        <p>Organize suas transações por categoria.</p>
      </div>
    </div>

    <div class="grid layout">
      <form class="card form" @submit.prevent="submit">
        <div class="card-title">{{ form.id ? 'Editar categoria' : 'Nova categoria' }}</div>
        <div class="field">
          <label for="c-name">Nome</label>
          <input id="c-name" v-model.trim="form.name" class="input" required placeholder="Ex.: Academia" />
        </div>
        <div class="field">
          <label>Tipo</label>
          <div class="segmented full">
            <button type="button" :class="{ on: form.type === 'expense' }" @click="form.type = 'expense'">Despesa</button>
            <button type="button" :class="{ on: form.type === 'income' }" @click="form.type = 'income'">Receita</button>
          </div>
        </div>
        <div class="field">
          <label>Cor</label>
          <div class="swatches">
            <button v-for="c in colors" :key="c" type="button" class="swatch" :class="{ on: form.color === c }"
              :style="{ background: c }" :aria-label="'Cor ' + c" @click="form.color = c"></button>
          </div>
        </div>
        <div class="field">
          <label>Ícone</label>
          <div class="swatches">
            <button v-for="i in icons" :key="i" type="button" class="icon-pick" :class="{ on: form.icon === i }"
              :aria-label="i" @click="form.icon = i"><i :class="['fa-solid', i]"></i></button>
          </div>
        </div>
        <div class="actions">
          <button class="btn btn-primary" type="submit">{{ form.id ? 'Salvar' : 'Adicionar categoria' }}</button>
          <button v-if="form.id" type="button" class="btn btn-ghost" @click="resetForm">Cancelar</button>
        </div>
      </form>

      <div class="lists">
        <div v-for="g in groups" :key="g.type" class="card">
          <div class="card-title">{{ g.label }} <span class="pill">{{ g.items.length }}</span></div>
          <div v-for="c in g.items" :key="c.id" class="cat-row">
            <span class="cat-dot" :style="{ background: c.color + '22', color: c.color }"><i :class="['fa-solid', c.icon]"></i></span>
            <div class="cat-main">
              <strong>{{ c.name }}</strong>
              <small class="muted">{{ count(c.id) }} transação(ões) · {{ money(total(c.id)) }}</small>
            </div>
            <button class="icon-btn" aria-label="Editar" @click="edit(c)"><i class="fa-solid fa-pen"></i></button>
            <button class="icon-btn" aria-label="Excluir" @click="remove(c)"><i class="fa-solid fa-trash"></i></button>
          </div>
          <div v-if="!g.items.length" class="empty">Nenhuma categoria.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { state, store, money } from '@/store'

const blank = () => ({ name: '', type: 'expense', color: '#6366f1', icon: 'fa-tag' })

export default {
  data: () => ({
    state,
    form: blank(),
    colors: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#06b6d4', '#14b8a6', '#64748b'],
    icons: ['fa-tag', 'fa-house', 'fa-utensils', 'fa-bus', 'fa-car', 'fa-gamepad', 'fa-heart-pulse', 'fa-graduation-cap', 'fa-briefcase', 'fa-laptop-code', 'fa-dumbbell', 'fa-cart-shopping', 'fa-plane', 'fa-gift']
  }),
  computed: {
    groups() {
      return [
        { type: 'expense', label: 'Despesas', items: state.categories.filter(c => c.type === 'expense') },
        { type: 'income', label: 'Receitas', items: state.categories.filter(c => c.type === 'income') }
      ]
    }
  },
  methods: {
    money,
    count(id) { return state.transactions.filter(t => t.categoryId === id).length },
    total(id) { return state.transactions.filter(t => t.categoryId === id).reduce((s, t) => s + t.amount, 0) },
    edit(c) { this.form = { ...c }; window.scrollTo({ top: 0, behavior: 'smooth' }) },
    resetForm() { this.form = blank() },
    remove(c) {
      const n = this.count(c.id)
      const msg = n ? `Excluir "${c.name}" e as ${n} transação(ões) dela?` : `Excluir "${c.name}"?`
      if (confirm(msg)) store.removeCategory(c.id)
    },
    submit() {
      if (this.form.id) store.updateCategory(this.form)
      else store.addCategory(this.form)
      this.resetForm()
    }
  }
}
</script>

<style scoped>
.layout { grid-template-columns: minmax(0, 340px) minmax(0, 1fr); align-items: start; }
.form { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 80px; }
.segmented.full { display: grid; grid-template-columns: 1fr 1fr; }
.swatches { display: flex; flex-wrap: wrap; gap: 8px; }
.swatch { width: 28px; height: 28px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; box-shadow: inset 0 0 0 2px var(--surface); }
.swatch.on { border-color: var(--text); }
.icon-pick { width: 36px; height: 36px; border-radius: 10px; border: 1px solid var(--border); background: var(--surface-2); color: var(--muted); cursor: pointer; }
.icon-pick.on { border-color: var(--accent); color: var(--text); background: var(--accent-soft); }
.actions { display: flex; gap: 8px; }
.actions .btn-primary { flex: 1; }
.lists { display: flex; flex-direction: column; gap: 16px; }
.cat-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--border); }
.cat-row:last-child { border-bottom: 0; }
.cat-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.cat-main small { font-size: .8rem; }
@media (max-width: 900px) {
  .layout { grid-template-columns: minmax(0, 1fr); }
  .form { position: static; }
}
</style>
