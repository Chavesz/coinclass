<template>
  <div class="tx-row">
    <span class="cat-dot" :style="{ background: cat.color + '22', color: cat.color }">
      <i :class="['fa-solid', cat.icon || 'fa-tag']"></i>
    </span>
    <div class="tx-main">
      <strong>{{ tx.description }}</strong>
      <small class="muted">{{ cat.name }} · {{ date }}</small>
    </div>
    <span class="tx-amount num" :class="tx.type === 'income' ? 'income-text' : 'expense-text'">
      {{ tx.type === 'income' ? '+' : '−' }} {{ amount }}
    </span>
    <slot />
  </div>
</template>

<script>
import { store, money, fmtDate } from '@/store'

export default {
  name: 'TxRow',
  props: { tx: { type: Object, required: true } },
  computed: {
    cat() { return store.category(this.tx.categoryId) || { name: 'Sem categoria', color: '#888888' } },
    amount() { return money(this.tx.amount) },
    date() { return fmtDate(this.tx.date) }
  }
}
</script>

<style scoped>
.tx-row { display: flex; align-items: center; gap: 12px; padding: 12px 4px; border-bottom: 1px solid var(--border); }
.tx-row:last-child { border-bottom: 0; }
.tx-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.tx-main strong { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tx-main small { font-size: .8rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tx-amount { font-weight: 700; white-space: nowrap; }
</style>
