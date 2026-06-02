/**
 * 主题:Arco 用 body 上的 arco-theme="dark" 属性切换深色
 *
 * 关键:applyTheme 既在 store 创建时立即同步执行(避免首屏闪烁),
 *       也在切换时通过 watchEffect 持续生效。
 */
import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'admin-webui:theme'

function readSaved(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(theme: Theme) {
  if (theme === 'dark') {
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
  }
}

/** 入口同步调用一次,把 dark attr 在 app mount 之前就贴上,避免白色闪烁 */
export function applyInitialTheme() {
  applyTheme(readSaved())
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(readSaved())

  watchEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme.value)
    applyTheme(theme.value)
  })

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  // 兼容旧的 apply 名,避免破坏调用方
  function apply() {
    applyTheme(theme.value)
  }

  return { theme, toggle, apply }
})
