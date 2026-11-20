<template>
  <div>
    <div class="page-head">
      <div>
        <h1>Relatórios</h1>
        <p>Para onde vai o seu dinheiro.</p>
      </div>
      <div class="segmented">
        <button v-for="p in periods" :key="p.v" :class="{ on: period === p.v }" @click="period = p.v">{{ p.l }}</button>
      </div>
    </div>

    <div class="grid grid-3">
      <div class="card kpi"><span class="muted">Receitas</span><strong class="num income-text">{{ money(income) }}</strong></div>
      <div class="card kpi"><span class="muted">Despesas</span><strong class="num expense-text">{{ money(expense) }}</strong></div>
      <div class="card kpi"><span class="muted">Taxa de economia</span><strong class="num">{{ savings }}%</strong></div>
    </div>

    <div class="grid grid-2 row">
      <div class="card">
        <div class="card-title">Saldo mês a mês</div>
        <AppChart type="line" :data="lineData" :height="280" />
      </div>
      <div class="card">
        <div class="card-title">Despesas por categoria</div>
        <div v-for="c in byCat" :key="c.id" class="bar-row">
          <div class="bar-head">
            <span><i :class="['fa-solid', c.icon]" :style="{ color: c.color }"></i> {{ c.name }}</span>
            <span class="num"><strong>{{ money(c.total) }}</strong> <small class="muted">{{ pct(c.total) }}%</small></span>
          </div>
          <div class="bar"><span :style="{ width: pct(c.total) + '%', background: c.color }"></span></div>
        </div>
        <div v-if="!byCat.length" class="empty">Sem despesas no período.</div>
      </div>
    </div>
  </div>
</template>

<script>
import AppChart from '@/components/AppChart.vue'
import { state, money, MONTHS, monthKey } from '@/store'

export default {
  components: { AppChart },
  data: () => ({
    state,
    period: 6,
    periods: [{ v: 1, l: 'Mês' }, { v: 3, l: '3 meses' }, { v: 6, l: '6 meses' }]
  }),
  computed: {
    monthList() {
      const now = new Date()
      const out = []
      for (let i = this.period - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        out.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, label: MONTHS[d.getMonth()] })
      }
      return out
    },
    tx() {
      const keys = this.monthList.map(m => m.key)
      return state.transactions.filter(t => keys.includes(monthKey(t.date)))
    },
    income() { return this.sum(this.tx, 'income') },
    expense() { return this.sum(this.tx, 'expense') },
    savings() { return this.income ? Math.round(((this.income - this.expense) / this.income) * 100) : 0 },
    byCat() {
      const map = {}
      this.tx.filter(t => t.type === 'expense').forEach(t => { map[t.categoryId] = (map[t.categoryId] || 0) + t.amount })
      return state.categories.filter(c => map[c.id]).map(c => ({ ...c, total: map[c.id] })).sort((a, b) => b.total - a.total)
    },
    lineData() {
      const months = this.period === 1 ? this.lastN(6) : this.monthList
      const bal = months.map(m => {
        const list = state.transactions.filter(t => monthKey(t.date) === m.key)
        return this.sum(list, 'income') - this.sum(list, 'expense')
      })
      return {
        labels: months.map(m => m.label),
        datasets: [{
          label: 'Saldo', data: bal, borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,.15)',
          fill: true, tension: .35, pointRadius: 4, pointBackgroundColor: '#f59e0b'
        }]
      }
    }
  },
  methods: {
    money,
    sum(list, type) { return list.filter(t => t.type === type).reduce((s, t) => s + t.amount, 0) },
    pct(v) { return this.expense ? Math.round((v / this.expense) * 100) : 0 },
    lastN(n) {
      const now = new Date()
      const out = []
      for (let i = n - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        out.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, label: MONTHS[d.getMonth()] })
      }
      return out
    }
  }
}
</script>

<style scoped>
.row { margin-top: 16px; }
.kpi { display: flex; flex-direction: column; gap: 6px; }
.kpi span { font-size: .9rem; font-weight: 600; }
.kpi strong { font-size: 1.6rem; font-weight: 800; letter-spacing: -.02em; }
.bar-row { margin-bottom: 14px; }
.bar-head { display: flex; justify-content: space-between; gap: 8px; font-size: .9rem; margin-bottom: 6px; }
.bar-head i { width: 18px; }
.bar { height: 8px; border-radius: 99px; background: var(--surface-2); overflow: hidden; }
.bar span { display: block; height: 100%; border-radius: 99px; transition: width .4s; }
</style>
