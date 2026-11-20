import Vue from 'vue'

const KEY = 'coinclass:v2'

const uid = () => Math.random().toString(36).slice(2, 10)

function iso(y, m, d) {
  return new Date(y, m, d).toISOString().slice(0, 10)
}

// Dados de exemplo para a demonstração (gerados em relação ao mês atual)
function seed() {
  const categories = [
    { id: 'c-sal', name: 'Salário', type: 'income', color: '#10b981', icon: 'fa-briefcase' },
    { id: 'c-free', name: 'Freelance', type: 'income', color: '#06b6d4', icon: 'fa-laptop-code' },
    { id: 'c-mor', name: 'Moradia', type: 'expense', color: '#6366f1', icon: 'fa-house' },
    { id: 'c-ali', name: 'Alimentação', type: 'expense', color: '#f59e0b', icon: 'fa-utensils' },
    { id: 'c-tra', name: 'Transporte', type: 'expense', color: '#ec4899', icon: 'fa-bus' },
    { id: 'c-laz', name: 'Lazer', type: 'expense', color: '#8b5cf6', icon: 'fa-gamepad' },
    { id: 'c-sau', name: 'Saúde', type: 'expense', color: '#ef4444', icon: 'fa-heart-pulse' },
    { id: 'c-edu', name: 'Educação', type: 'expense', color: '#14b8a6', icon: 'fa-graduation-cap' }
  ]
  const now = new Date()
  const tx = []
  const add = (offset, day, description, categoryId, amount) => {
    const d = new Date(now.getFullYear(), now.getMonth() - offset, 1)
    const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
    const dd = Math.min(day, offset === 0 ? Math.max(1, now.getDate()) : last)
    const cat = categories.find(c => c.id === categoryId)
    tx.push({ id: uid(), date: iso(d.getFullYear(), d.getMonth(), dd), description, categoryId, type: cat.type, amount })
  }
  for (let o = 5; o >= 0; o--) {
    const v = (5 - o) * 37
    add(o, 5, 'Salário', 'c-sal', 3200)
    if (o % 2 === 0) add(o, 18, 'Projeto freelance', 'c-free', 650 + v)
    add(o, 8, 'Aluguel', 'c-mor', 1100)
    add(o, 10, 'Conta de luz', 'c-mor', 140 + (o * 13) % 40)
    add(o, 12, 'Supermercado', 'c-ali', 520 + (o * 29) % 90)
    add(o, 22, 'Restaurante', 'c-ali', 95 + (o * 17) % 60)
    add(o, 3, 'Passe de ônibus', 'c-tra', 180)
    if (o % 3 !== 1) add(o, 26, 'Cinema e lanche', 'c-laz', 70 + (o * 11) % 50)
    add(o, 15, 'Mensalidade faculdade', 'c-edu', 420)
    if (o === 1 || o === 4) add(o, 20, 'Farmácia', 'c-sau', 85)
  }
  return {
    user: { name: 'Visitante', email: '' },
    theme: 'system',
    categories,
    transactions: tx
  }
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) { /* ignora */ }
  return seed()
}

export const state = Vue.observable(load())

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch (e) { /* ignora */ }
}
save()

export const store = {
  state,
  save,
  category(id) { return state.categories.find(c => c.id === id) },
  addTransaction(t) { state.transactions.push({ ...t, id: uid() }); save() },
  updateTransaction(t) {
    const i = state.transactions.findIndex(x => x.id === t.id)
    if (i > -1) state.transactions.splice(i, 1, { ...t })
    save()
  },
  removeTransaction(id) { state.transactions = state.transactions.filter(t => t.id !== id); save() },
  addCategory(c) { state.categories.push({ ...c, id: uid() }); save() },
  updateCategory(c) {
    const i = state.categories.findIndex(x => x.id === c.id)
    if (i > -1) state.categories.splice(i, 1, { ...c })
    save()
  },
  removeCategory(id) {
    state.categories = state.categories.filter(c => c.id !== id)
    state.transactions = state.transactions.filter(t => t.categoryId !== id)
    save()
  },
  setTheme(t) { state.theme = t; save(); applyTheme() },
  setUser(u) { state.user = { ...state.user, ...u }; save() },
  reset() { Object.assign(state, seed()); save(); applyTheme() },
  clear() { state.transactions = []; save() }
}

export function applyTheme() {
  const dark = state.theme === 'dark' ||
    (state.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
  return dark
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
export const money = v => brl.format(v || 0)
export const fmtDate = s => {
  const [y, m, d] = s.split('-')
  return `${d}/${m}/${y}`
}
export const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
export const monthKey = s => s.slice(0, 7)
