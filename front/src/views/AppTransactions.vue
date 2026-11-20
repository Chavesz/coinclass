<template>
  <div>
    <div class="page-head">
      <div>
        <h1>Transações</h1>
        <p>Registre, filtre e edite suas receitas e despesas.</p>
      </div>
    </div>

    <div class="card filters">
      <div class="search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input v-model="q" class="input" placeholder="Buscar descrição" aria-label="Buscar descrição" />
      </div>
      <div class="segmented">
        <button v-for="o in types" :key="o.v" :class="{ on: type === o.v }" @click="type = o.v">{{ o.l }}</button>
      </div>
      <select v-model="month" class="input month" aria-label="Mês">
        <option value="">Todos os meses</option>
        <option v-for="m in months" :key="m.key" :value="m.key">{{ m.label }}</option>
      </select>
    </div>

    <div class="totals">
      <span class="pill"><i class="fa-solid fa-arrow-trend-up income-text"></i>{{ money(totIn) }}</span>
      <span class="pill"><i class="fa-solid fa-arrow-trend-down expense-text"></i>{{ money(totOut) }}</span>
      <span class="pill">Saldo {{ money(totIn - totOut) }}</span>
    </div>

    <div class="card">
      <TxRow v-for="t in filtered" :key="t.id" :tx="t" class="clickable" @click.native="edit(t)">
        <div class="row-actions">
          <button class="icon-btn" aria-label="Editar" @click.stop="edit(t)"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-btn" aria-label="Excluir" @click.stop="remove(t)"><i class="fa-solid fa-trash"></i></button>
        </div>
      </TxRow>
      <div v-if="!filtered.length" class="empty">
        <i class="fa-solid fa-receipt"></i>Nenhuma transação encontrada.
      </div>
    </div>

    <div v-if="form" class="modal-bg" @click.self="form = null">
      <form class="modal card" @submit.prevent="submit">
        <div class="card-title">
          {{ form.id ? 'Editar transação' : 'Nova transação' }}
          <button type="button" class="icon-btn" aria-label="Fechar" @click="form = null"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="segmented full">
          <button type="button" :class="{ on: form.type === 'expense' }" @click="setType('expense')">Despesa</button>
          <button type="button" :class="{ on: form.type === 'income' }" @click="setType('income')">Receita</button>
        </div>
        <div class="field">
          <label for="f-desc">Descrição</label>
          <input id="f-desc" v-model.trim="form.description" class="input" required placeholder="Ex.: Supermercado" />
        </div>
        <div class="two">
          <div class="field">
            <label for="f-amount">Valor (R$)</label>
            <input id="f-amount" v-model.number="form.amount" class="input" type="number" min="0.01" step="0.01" required inputmode="decimal" />
          </div>
          <div class="field">
            <label for="f-date">Data</label>
            <input id="f-date" v-model="form.date" class="input" type="date" required />
          </div>
        </div>
        <div class="field">
          <label for="f-cat">Categoria</label>
          <select id="f-cat" v-model="form.categoryId" class="input" required>
            <option v-for="c in catOptions" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>
        </div>
        <div class="modal-actions">
          <button v-if="form.id" type="button" class="btn btn-danger" @click="remove(form)"><i class="fa-solid fa-trash"></i>Excluir</button>
          <button class="btn btn-primary" type="submit">{{ form.id ? 'Salvar alterações' : 'Adicionar' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TxRow from '@/components/TxRow.vue'
import { state, store, money, MONTHS, monthKey } from '@/store'

const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default {
  components: { TxRow },
  data: () => ({
    state,
    q: '',
    type: 'all',
    month: '',
    form: null,
    types: [{ v: 'all', l: 'Todas' }, { v: 'income', l: 'Receitas' }, { v: 'expense', l: 'Despesas' }]
  }),
  computed: {
    months() {
      const keys = [...new Set(state.transactions.map(t => monthKey(t.date)))].sort().reverse()
      return keys.map(k => ({ key: k, label: `${MONTHS[Number(k.slice(5)) - 1]} ${k.slice(0, 4)}` }))
    },
    filtered() {
      const q = this.q.toLowerCase()
      return state.transactions
        .filter(t => this.type === 'all' || t.type === this.type)
        .filter(t => !this.month || monthKey(t.date) === this.month)
        .filter(t => !q || t.description.toLowerCase().includes(q))
        .sort((a, b) => b.date.localeCompare(a.date))
    },
    totIn() { return this.filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0) },
    totOut() { return this.filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0) },
    catOptions() { return state.categories.filter(c => this.form && c.type === this.form.type) }
  },
  mounted() {
    if (this.$route.query.nova) this.openNew()
  },
  watch: {
    '$route.query.nova'(v) { if (v) this.openNew() }
  },
  methods: {
    money,
    openNew() {
      const first = state.categories.find(c => c.type === 'expense')
      this.form = { description: '', amount: null, date: today(), type: 'expense', categoryId: first ? first.id : '' }
    },
    setType(t) {
      this.form.type = t
      const first = state.categories.find(c => c.type === t)
      this.form.categoryId = first ? first.id : ''
    },
    edit(t) { this.form = { ...t } },
    remove(t) {
      if (confirm(`Excluir "${t.description}"?`)) {
        store.removeTransaction(t.id)
        this.form = null
      }
    },
    submit() {
      if (this.form.id) store.updateTransaction(this.form)
      else store.addTransaction(this.form)
      this.form = null
      if (this.$route.query.nova) this.$router.replace('/transacoes')
    }
  }
}
</script>

<style scoped>
.filters { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; padding: 14px; margin-bottom: 12px; }
.search { position: relative; flex: 1 1 220px; }
.search i { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: .85rem; }
.search .input { padding-left: 34px; }
.month { flex: 0 1 190px; }
.totals { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
.row-actions { display: flex; }
.clickable { cursor: pointer; }
.modal-actions { display: flex; gap: 8px; }
.modal-actions .btn-primary { flex: 1; }
.modal-bg { position: fixed; inset: 0; z-index: 50; background: rgba(5, 8, 15, .55); display: grid; place-items: center; padding: 16px; }
.modal { width: 100%; max-width: 440px; display: flex; flex-direction: column; gap: 14px; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.segmented.full { display: grid; grid-template-columns: 1fr 1fr; }
@media (max-width: 520px) {
  .row-actions { display: none; }
  .month { flex: 1 1 100%; }
  .segmented:not(.full) { flex: 1 1 100%; display: grid; grid-template-columns: repeat(3, 1fr); }
  .modal-bg { place-items: end center; padding: 0; }
  .modal { border-radius: 20px 20px 0 0; max-width: none; }
}
</style>
