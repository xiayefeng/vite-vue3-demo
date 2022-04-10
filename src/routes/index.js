import * as VueRouter from 'vue-router'
const Home = () => import('@/views/Home.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: Home,
      head: () => import('@/views/TopHeader.vue'),
      'left-nav': () => import('@/views/LeftNav.vue')
    }
  },
  {
    path: '/about/:id?',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () =>
        import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
    // meta: { keepAlive: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('@/views/Table.vue')
  },
  {
    path: '/event',
    name: 'event',
    component: () => import('@/views/MyEvent.vue')
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('@/views/FormSubmit.vue')
  },
  {
    path: '/photo',
    name: 'photo',
    component: () => import('@/views/FacePhoto.vue')
  },
  {
    path: '/imgUpload',
    name: 'imgUpload',
    component: () => import('@/views/ImgWater.vue')
  },
  {
    path: '/mediaFile',
    name: 'mediaFile',
    component: () => import('@/views/MediaFile.vue')
  },
  {
    path: '/excel',
    name: 'excel',
    component: () => import('@/views/XlsxFileReader.vue')
  },
  {
    path: '/inputOberve',
    name: 'inputOberve',
    component: () => import('@/views/InputValueOberve.vue')
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

export default router