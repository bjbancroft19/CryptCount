// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'normalize-css'
import Vue2Filters from 'vue2-filters'
import VueProgressBar from 'vue-progressbar'

const options = {
  color: 'rgba(190, 228, 249, 0.7)',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0s',
    termination: 300
  }
}

Vue.use(VueProgressBar, options)
Vue.use(Vue2Filters)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
