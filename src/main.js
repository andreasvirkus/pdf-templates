import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VuePersist from 'vue-persist'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(VuePersist)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
