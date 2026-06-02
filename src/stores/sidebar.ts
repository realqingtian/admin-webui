/**
 * 侧栏折叠状态(持久化)
 */
import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

const STORAGE_KEY = 'admin-webui:sidebar-collapsed'

export const useSidebarStore = defineStore('sidebar', () => {
  const collapsed = ref<boolean>(localStorage.getItem(STORAGE_KEY) === '1')

  watchEffect(() => {
    localStorage.setItem(STORAGE_KEY, collapsed.value ? '1' : '0')
  })

  function toggle() {
    collapsed.value = !collapsed.value
  }

  return { collapsed, toggle }
})
