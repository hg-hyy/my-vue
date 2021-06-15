import home from '../components/home/home.vue'
import admin from '../components/layout/admin.vue'
import blog from '../components/blog/blog.vue'
import profile from '../components/profile/profile.vue'
import show from '../components/show/show.vue'
import album from '../components/show/album.vue'
import price from '../components/show/price.vue'
import checkout from '../components/show/checkout.vue'
import table from '../components/show/table.vue'
import excel from '../components/show/jsonexcel.vue'
import signin from '../components/auth/signin.vue'
import signup from '../components/auth/signup.vue'
import notFound from '../components/errors/notfound.vue'
import dashboard from '../components/dashboard/index.vue'

const routes = [{
    path: '/',
    component: home
  },
  {
    path: '/admin',
    component: admin
  },
  {
    path: '/blog',
    component: blog
  },
  {
    path: '/dashboard',
    component: dashboard
  },
  {
    path: '/profile',
    component: profile
  },
  {
    path: '/show',
    component: show,
    // redirect: '/show/album',
    children: [{
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'album',
        component: album
      },
      {
        path: 'price',
        component: price
      },
      {
        path: 'checkout',
        component: checkout
      },
      {
        path: 'table',
        component: table
      },
      {
        path: 'excel',
        component: excel
      }
    ]
  },
  {
    path: '/signin',
    component: signin
  },
  {
    path: '/signup',
    component: signup
  },
  {
    path: '/route',
    component: signup
  },
  {
    path: '*',
    component: notFound
  }
]
export default routes