import Vue from 'vue'
import MainWrapper from '@/components/wrappers/MainWrapper'
import AppWrapper from '@/components/wrappers/AppWrapper'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Router from 'vue-router'
import LoginMiddleware from '@/helpers/LoginMiddleware'
import Home from '@/components/pages/Home'
import Mobile from '@/components/pages/Mobile'
import Page from '@/components/pages/Page'
import Playlists from '@/components/pages/Playlists'
import Albums from '@/components/pages/Albums'
import Genres from '@/components/pages/Genres'
import Artists from '@/components/pages/Artists'
import Artist from '@/components/pages/single/Artist'
import Album from '@/components/pages/single/Album'
import Genre from '@/components/pages/single/Genre'
import Playlist from '@/components/pages/single/Playlist'
import Settings from '@/components/pages/Settings'
import Favorites from '@/components/pages/Favorites'
import Search from '@/components/pages/Search'

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
          path: '/login',
          name: 'Login',
          component: Login,
          meta: { keyTitle: 'Login' },
          beforeEnter: async (to, from, next) => {
            const route = await LoginMiddleware(to)
            next(route)
          }
        },
        {
          path: '/register',
          name: 'Register',
          component: Register,
          meta: { keyTitle: 'Register' },
          beforeEnter: async (to, from, next) => {
            const route = await LoginMiddleware(to)
            next(route)
          }
        },
        {
          path: '/mobile',
          name: 'Mobile',
          component: Mobile
        },
        {
          path: '/',
          name: 'AppWrapper',
          component: AppWrapper,
          children: [
            {
              path: '/',
              name: 'Page',
              component: Page,
              children: [
                {
                  path: '/',
                  name: 'Home',
                  component: Home
                },
                {
                  path: '/settings',
                  name: 'Settings',
                  component: Settings
                },
                {
                  path: '/playlists',
                  name: 'Playlists',
                  component: Playlists
                },
                {
                  path: '/playlists/:id',
                  name: 'Playlist',
                  props: true,
                  component: Playlist
                },
                {
                  path: '/favorites',
                  name: 'Favorites',
                  component: Favorites
                },
                {
                  path: '/albums',
                  name: 'Albums',
                  component: Albums
                },
                {
                  path: '/albums/:id',
                  props: true,
                  name: 'Album',
                  component: Album
                },
                {
                  path: '/artists',
                  name: 'Artists',
                  component: Artists
                },
                {
                  path: '/artists/:id',
                  name: 'Artist',
                  props: true,
                  component: Artist
                },
                {
                  path: '/genres',
                  name: 'Genres',
                  component: Genres
                },
                {
                  path: '/genres/:id',
                  name: 'Genre',
                  props: true,
                  component: Genre
                },
                {
                  path: '/search',
                  name: 'Search',
                  component: Search
                }
              ]
            }
          ],
          beforeEnter: async (to, from, next) => {
            const route = await LoginMiddleware(to)
            console.log(route)
            next(route)
          }
        }
      ]
    }
  ]
})

Vue.use(Router)
