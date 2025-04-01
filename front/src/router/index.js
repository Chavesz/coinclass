import Vue from 'vue'
import Router from 'vue-router'
import AppLogin from '@/views/AppLogin.vue'
import AppRegister from '@/views/AppRegister.vue'
import AppDashboard from '@/views/AppDashboard.vue'
import AppCategories from '@/views/AppCategories.vue'
import AppReports from '@/views/AppReports.vue'
import AppSettings from '@/views/AppSettings.vue'
import AppTransactions from '@/views/AppTransactions.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppLogin',
      component: AppLogin
    },
    {
      path: '/Appregister',
      name: 'AppRegister',
      component: AppRegister
    },
    {
      path: '/AppDashboard',
      name: 'AppDashboard',
      component: AppDashboard
    },
    {
      path: '/AppCategories',
      name: 'AppCategories',
      component: AppCategories
    },
    {
      path: '/AppReports',
      name: 'AppReports',
      component: AppReports
    },
    {
      path: '/AppSettings',
      name: 'AppSettings',
      component: AppSettings
    },
    {
      path: '/AppTransactions',
      name: 'AppTransactions',
      component: AppTransactions
    },
  ]
})
