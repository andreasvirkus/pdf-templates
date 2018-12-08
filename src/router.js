import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/formats/:id?',
      name: 'formats',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ './views/Formats.vue')
    },
    {
      path: '/fields',
      name: 'fields',
      component: () => import(/* webpackChunkName: "about" */ './views/Fields.vue')
    }
  ]
})
