import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import './tailwind.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);  // Aqui você registra o Vuetify

new Vue({
  render: h => h(App),
  router,
  vuetify: new Vuetify()  // Agora você passa uma instância do Vuetify para a Vue
}).$mount('#app');
