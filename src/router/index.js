import Vue from 'vue'
import MainWrapper from '@/components/wrappers/MainWrapper'
import AppWrapper from '@/components/wrappers/AppWrapper'
import Login from '@/components/Login'
import Router from 'vue-router'
// import LoginMiddleware from '@/helpers/LoginMiddleware'

export const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'MainWrapper',
      component: MainWrapper,
      children: [
        {
          path: '/',
          name: 'AppWrapper',
          component: AppWrapper,
          children: [],
          beforeEnter: async (to, from, next) => {
            // const route = await LoginMiddleware(to)
            next('/login')
          }
        },
        {
          path: '/login',
          name: 'Login',
          component: Login,
          meta: { keyTitle: 'login_createprofile_signin' }
        }
      ]
    }
  ]
})

Vue.use(Router)
