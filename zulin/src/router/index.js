import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Auction from '../views/Auction.vue'
import Lease from '../views/Lease.vue'
import Mine from '../views/Mine.vue'
import Put from '../views/Put.vue'
import PutLease from '../views/PutLease.vue'
import AuctionInfo from '../views/AuctionInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path:'/register',
    name:'register',
    component:Register
  },
  {
    path:'/home',
    name:'home',
    component:Home,
    children:[
      {
        path:'auction',
        component:Auction
      },
      {
        path:'lease',
        component:Lease
      },
      {
        path:'mine',
        component:Mine
      },
      {
        path:'put',
        component:Put
      },
      {
        path:'putLease',
        component:PutLease
      }
     
    ]
  },
  {
    path:'/auctionInfo',
    component:AuctionInfo
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

const VueRouterPush =VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
