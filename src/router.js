import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      component: () => import(/* webpackChunkName: "home" */ 'PAGES/Home')
    },
    {
      path: '/auth',
      name: 'auth',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ 'PAGES/Auth')
    },
    {
      path: '/activity',
      component: () => import(/* webpackChunkName: "activity" */ 'PAGES/Activity')
    }
  ]
})
