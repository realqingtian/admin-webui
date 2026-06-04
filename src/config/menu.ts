/**
 * 菜单配置 —— title 字段存 i18n key,渲染时再 t() 解析
 */
import type { Component } from 'vue'
import { IconDashboard, IconApps, IconImage, IconUpload } from '@arco-design/web-vue/es/icon'

export interface MenuItem {
  key: string
  /** i18n key,如 'menu.dashboard' */
  title: string
  icon: Component
  path: string
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
]
