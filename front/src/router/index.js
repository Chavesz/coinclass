import Vue from 'vue'
import Router from 'vue-router'
import AppOverview from '@/views/AppOverview.vue'
import AppTransactions from '@/views/AppTransactions.vue'
import AppCategories from '@/views/AppCategories.vue'
import AppReports from '@/views/AppReports.vue'
import AppSettings from '@/views/AppSettings.vue'
import AppLogin from '@/views/AppLogin.vue'

Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    { path: '/', name: 'overview', component: AppOverview, meta: { title: 'Visão geral' } },
    { path: '/transacoes', name: 'transactions', component: AppTransactions, meta: { title: 'Transações' } },
    { path: '/categorias', name: 'categories', component: AppCategories, meta: { title: 'Categorias' } },
    { path: '/relatorios', name: 'reports', component: AppReports, meta: { title: 'Relatórios' } },
    { path: '/configuracoes', name: 'settings', component: AppSettings, meta: { title: 'Configurações' } },
    { path: '/entrar', name: 'login', component: AppLogin, meta: { bare: true, mode: 'login' } },
    { path: '/cadastro', name: 'register', component: AppLogin, meta: { bare: true, mode: 'register' } },
    { path: '*', redirect: '/' }
  ]
})
