import Vue from 'vue'
import Router from 'vue-router'
import Table from '@/components/Table'
import Coin from '@/components/Coin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Table',
      component: Table
    },
    {
      path: '/:id',
      name: 'Coin',
      component: Coin
    }
  ]
})
