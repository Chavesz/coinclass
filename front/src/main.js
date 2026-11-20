import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './styles.css'
import { applyTheme } from './store'

Vue.config.productionTip = false

applyTheme()
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
