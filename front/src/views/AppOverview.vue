<template>
  <div>
    <div class="page-head">
      <div>
        <h1>Olá, {{ firstName }}</h1>
        <p>Resumo de {{ monthLabel }}.</p>
      </div>
    </div>

    <div class="grid grid-3 stats">
      <div class="card stat balance">
        <span class="stat-label"><i class="fa-solid fa-wallet"></i> Saldo do mês</span>
        <strong class="num">{{ money(income - expense) }}</strong>
        <small>Total acumulado: {{ money(totalBalance) }}</small>
      </div>
      <div class="card stat">
        <span class="stat-label"><span class="ico income"><i class="fa-solid fa-arrow-trend-up"></i></span> Receitas</span>
        <strong class="num">{{ money(income) }}</strong>
        <small class="muted">{{ countIncome }} lançamento(s)</small>
      </div>
      <div class="card stat">
        <span class="stat-label"><span class="ico expense"><i class="fa-solid fa-arrow-trend-down"></i></span> Despesas</span>
        <strong class="num">{{ money(expense) }}</strong>
        <small class="muted">{{ countExpense }} lançamento(s)</small>
      </div>
    </div>

    <div class="grid grid-2 row">
      <div class="card">
        <div class="card-title">Receitas x despesas <span class="pill">Últimos 6 meses</span></div>
        <AppChart :data="barData" :height="270" />
      </div>
      <div class="card">
        <div class="card-title">Gastos por categoria <router-link to="/relatorios">Ver relatório</router-link></div>
        <div v-if="byCat.length" class="donut-wrap">
          <AppChart type="doughnut" :data="donutData" :height="170" />
          <ul class="legend">
            <li v-for="c in byCat.slice(0, 5)" :key="c.id">
              <span class="dot" :style="{ background: c.color }"></span>
              <span class="lname">{{ c.name }}</span>
              <span class="num">{{ pct(c.total) }}%</span>
            </li>
          </ul>
        </div>
        <div v-else class="empty"><i class="fa-solid fa-chart-pie"></i>Sem despesas neste mês.</div>
      </div>
    </div>

    <div class="card row">
      <div class="card-title">Últimas transações <router-link to="/transacoes">Ver todas</router-link></div>
      <TxRow v-for="t in recent" :key="t.id" :tx="t" />
      <div v-if="!recent.length" class="empty">
        <i class="fa-solid fa-receipt"></i>Nenhuma transação ainda.
      </div>
    </div>
  </div>
</template>

<script>
import AppChart from '@/components/AppChart.vue'
import TxRow from '@/components/TxRow.vue'
import { state, money, MONTHS, monthKey } from '@/store'

export default {
  components: { AppChart, TxRow },
  data: () => ({ state }),
  computed: {
    firstName() { return (state.user.name || 'Visitante').split(' ')[0] },
    key() {
      const d = new Date()
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    },
    monthLabel() {
      const d = new Date()
      return d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    },
    monthTx() { return state.transactions.filter(t => monthKey(t.date) === this.key) },
    income() { return this.sum(this.monthTx, 'income') },
    expense() { return this.sum(this.monthTx, 'expense') },
    countIncome() { return this.monthTx.filter(t => t.type === 'income').length },
    countExpense() { return this.monthTx.filter(t => t.type === 'expense').length },
    totalBalance() { return this.sum(state.transactions, 'income') - this.sum(state.transactions, 'expense') },
    recent() {
      return [...state.transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)
    },
    barData() {
      const now = new Date()
      const months = []
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        months.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, label: MONTHS[d.getMonth()] })
      }
      const by = (k, type) => this.sum(state.transactions.filter(t => monthKey(t.date) === k), type)
      return {
        labels: months.map(m => m.label),
        datasets: [
          { label: 'Receitas', data: months.map(m => by(m.key, 'income')), backgroundColor: '#10b981', borderRadius: 6, maxBarThickness: 22 },
          { label: 'Despesas', data: months.map(m => by(m.key, 'expense')), backgroundColor: '#f43f5e', borderRadius: 6, maxBarThickness: 22 }
        ]
      }
    },
    byCat() {
      const map = {}
      this.monthTx.filter(t => t.type === 'expense').forEach(t => { map[t.categoryId] = (map[t.categoryId] || 0) + t.amount })
      return state.categories.filter(c => map[c.id]).map(c => ({ ...c, total: map[c.id] })).sort((a, b) => b.total - a.total)
    },
    donutData() {
      return {
        labels: this.byCat.map(c => c.name),
        datasets: [{ data: this.byCat.map(c => c.total), backgroundColor: this.byCat.map(c => c.color), borderWidth: 0 }]
      }
    }
  },
  methods: {
    money,
    sum(list, type) { return list.filter(t => t.type === type).reduce((s, t) => s + Number(t.amount), 0) },
    pct(v) { return this.expense ? Math.round((v / this.expense) * 100) : 0 }
  }
}
</script>

<style scoped>
.row { margin-top: 16px; }
@media (max-width: 900px) {
  .stats { grid-template-columns: 1fr 1fr; gap: 12px; }
  .stats .balance { grid-column: 1 / -1; }
  .stat { padding: 16px; }
  .stat strong { font-size: clamp(1rem, 4.6vw, 1.25rem); }
  .stats .balance strong { font-size: 1.9rem; }
}
.stat { display: flex; flex-direction: column; gap: 8px; }
.stat-label { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: .9rem; color: var(--muted); }
.stat strong { font-size: 1.75rem; font-weight: 800; letter-spacing: -.02em; }
.stat small { font-size: .8rem; }
.ico { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; font-size: .8rem; }
.ico.income { background: var(--income-soft); color: var(--income); }
.ico.expense { background: var(--expense-soft); color: var(--expense); }
.stat.balance { background: linear-gradient(135deg, #1f2433, #121826); color: #fff; border-color: transparent; }
.stat.balance .stat-label, .stat.balance small { color: rgba(255,255,255,.7); }
.stat.balance .stat-label i { color: var(--accent); }
html.dark .stat.balance { background: linear-gradient(135deg, #2a2210, #1a1508); border-color: rgba(251,191,36,.25); }
.donut-wrap { display: flex; flex-direction: column; gap: 16px; }
.legend { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.legend li { display: flex; align-items: center; gap: 10px; font-size: .9rem; }
.legend .dot { width: 10px; height: 10px; border-radius: 3px; }
.legend .lname { flex: 1; }
.legend .num { font-weight: 700; }
</style>
