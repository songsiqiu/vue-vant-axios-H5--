import Home from '../views/Home.vue'
import Index from '../views/home/Index.vue'

const routes = [
  {
    path: '/',
    name: "Home",
    component: Home,
    redirect: '/index',
    children: [
      { path: '/index', name: 'Index', component: Index },
      { path: '/class', name: 'Class', component: () => import('../views/classification/index.vue') },
      {
        path: '/bookshelf',
        name: "BookShelf",
        component: () => import('../views/bookShelf/bookShelf.vue')
      },
      {
        path: '/my',
        name: "My",
        component: () => import('../views/my/my.vue'),
      },
    ]
  },
  { path: '/setting', component: () => import('../views/my/pages/setting.vue') },
  { path: '/deliveryAddress', component:() => import('../views/my/pages/deliveryAddress.vue') },
  { path: '/orderdetail', component:()=>import("../views/my/pages/order.vue")},
  { path: '/edit', name: "Edit", component: () => import('../views/edit/edit.vue') },
  {
    path: '/detail',
    name: "Detail",
    component: () => import('../views/detail/index.vue')
  },
  {
    path: '/login', component: () => import('../views/login/login.vue'), redirect: '/login/loginindex', children: [
      { path: 'loginindex', component: () => import('../views/login/components/loginIndex.vue') },
      { path: 'resetpwd', component: () => import('../views/login/components/resetPwd.vue') },
      { path: 'resetpwdsubmit', component: () => import('../views/login/components/resetPwdSubmit.vue') }
    ]
  },
  { path: '/search', component: () => import('../views/home/pages/search.vue'),children:[
    { path: 'searchResult', name:'searchResult', component:() => import('../views/home/pages/components/serchResult.vue'),meta:{
      keepAlive:true
    }}
  ]}

]

export default routes