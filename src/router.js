import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Music from './views/Music.vue'
import Couplets from './components/GenCouplets.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Login,
        About: About,
        Music: Music,
        Couplets: Couplets
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('./views/Music.vue')
    },
    { //对对联的路由
      path: '/couplets',
      name: 'couplets',
      component: () => import('./views/Couplets.vue')
    },
    {
      path: '/container',
      // name: 'container',
      component: () => import('./views/Container.vue')
    },

    {
      path: '/login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '*',
      component: () => import('./views/Music.vue')
    }

  ]
})
