import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'editor',
      component: () => import('./views/Editor.vue')
    },
    {
      path: '/page',
      name: 'page',
      component: () => import('./views/Page.vue')
    }
  ]
})
