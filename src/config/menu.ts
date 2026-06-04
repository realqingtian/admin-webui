/**
 * 菜单配置 —— title 字段存 i18n key,渲染时再 t() 解析
 */
import type { Component } from 'vue'
import {
  IconDashboard,
  IconApps,
  IconImage,
  IconUpload,
  IconMenu,
} from '@arco-design/web-vue/es/icon'

/**
 * 二级子菜单
 */
export interface SubMenuItem {
  key: string
  /** i18n key,如 'menu.menu1' */
  title: string
  path: string
}

/**
 * 菜单项:无 children 即为普通菜单项,有 children 即为带二级菜单的菜单组
 */
export interface MenuItem {
  key: string
  /** i18n key,如 'menu.menuDemo' */
  title: string
  icon: Component
  /** 一级菜单的路径(有 children 时作为默认展开/选中态匹配前缀;无 children 时即跳转目标) */
  path: string
  /** 二级子菜单,可选 */
  children?: SubMenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    title: 'menu.dashboard',
    icon: IconDashboard,
    path: '/dashboard',
  },
  {
    key: 'example',
    title: 'menu.example',
    icon: IconApps,
    path: '/example',
  },
  {
    key: 'image',
    title: 'menu.image',
    icon: IconImage,
    path: '/image',
  },
  {
    key: 'upload',
    title: 'menu.upload',
    icon: IconUpload,
    path: '/upload',
  },
  {
    // 一级菜单 —— 二级菜单示例
    key: 'menu-demo',
    title: 'menu.menuDemo',
    icon: IconMenu,
    path: '/menu-demo',
    children: [
      {
        key: 'menu1',
        title: 'menu.menu1',
        path: '/menu-demo/menu1',
      },
      {
        key: 'menu2',
        title: 'menu.menu2',
        path: '/menu-demo/menu2',
      },
      {
        key: 'menu3',
        title: 'menu.menu3',
        path: '/menu-demo/menu3',
      },
    ],
  },
]
