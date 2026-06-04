import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

/**
 * meta.title 存放 i18n key,渲染时再 t() 解析,
 * 这样切换语言面包屑 / document.title 都会跟着变。
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginView.vue'),
    meta: { title: 'login.title', requiresAuth: false },
  },
  {
    path: '/',
    component: () => import('@/layouts/AdminLayout.vue'),
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: { title: 'menu.dashboard', requiresAuth: true },
      },
      {
        path: 'example',
        name: 'example',
        component: () => import('@/views/example/ExampleView.vue'),
        meta: { title: 'menu.example', requiresAuth: true },
      },
      {
        path: 'image',
        name: 'image',
        component: () => import('@/views/image/ImageView.vue'),
        meta: { title: 'menu.image', requiresAuth: true },
      },
      {
        path: 'upload',
        name: 'upload',
        component: () => import('@/views/upload/UploadView.vue'),
        meta: { title: 'menu.upload', requiresAuth: true },
      },
      // 二级菜单示例:父路由仅占位,默认重定向到 menu1
      {
        path: 'menu-demo',
        name: 'menu-demo',
        redirect: '/menu-demo/menu1',
        component: () => import('@/views/menu-demo/MenuDemoView.vue'),
        meta: { title: 'menu.menuDemo', requiresAuth: true },
        children: [
          {
            path: 'menu1',
            name: 'menu1',
            component: () => import('@/views/menu-demo/Menu1View.vue'),
            meta: { title: 'menu.menu1', requiresAuth: true },
          },
          {
            path: 'menu2',
            name: 'menu2',
            component: () => import('@/views/menu-demo/Menu2View.vue'),
            meta: { title: 'menu.menu2', requiresAuth: true },
          },
          {
            path: 'menu3',
            name: 'menu3',
            component: () => import('@/views/menu-demo/Menu3View.vue'),
            meta: { title: 'menu.menu3', requiresAuth: true },
          },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'notFound.title', requiresAuth: false },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// 登录守卫(document.title 由 App.vue watch 路由 + locale 维护)
router.beforeEach((to) => {
  const userStore = useUserStore()
  const isLoggedIn = !!userStore.token

  if (to.meta?.requiresAuth && !isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.name === 'login' && isLoggedIn) {
    return { path: '/dashboard' }
  }
  return true
})

export default router
