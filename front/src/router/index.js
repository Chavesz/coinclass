import Vue from 'vue'
import Router from 'vue-router'
import AppLogin from '@/views/AppLogin.vue'
import AppRegister from '@/views/AppRegister.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppLogin',
      component: AppLogin
    },
    {
      path: '/register',
      name: 'AppRegister',
      component: AppRegister
    }
  ]
})
