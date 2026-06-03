/**
 * 国际化入口 ——
 *   1. 默认语言:中文
 *   2. 优先级:localStorage > 浏览器语言 > 默认中文
 *   3. 同时为 Arco 提供匹配的 ConfigProvider locale
 */
import { computed } from 'vue'
import { createI18n } from 'vue-i18n'
import arcoZhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import arcoEnUS from '@arco-design/web-vue/es/locale/lang/en-us'
import arcoArEG from '@arco-design/web-vue/es/locale/lang/ar-eg'
import arcoJaJP from '@arco-design/web-vue/es/locale/lang/ja-jp'

import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'
import arSA from './locales/ar-SA'
import jaJP from './locales/ja-JP'

export const SUPPORTED_LOCALES = ['zh-CN', 'en-US', 'ar-SA', 'ja-JP'] as const
export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: AppLocale = 'zh-CN'
const STORAGE_KEY = 'admin-webui:locale'

/** 是否在支持列表内 */
function isSupported(value: string | null): value is AppLocale {
  return !!value && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

/**
 * 解析浏览器语言到内部 locale:
 *   - zh / zh-CN / zh-Hans / zh-TW / zh-HK → zh-CN
 *   - en / en-US / en-GB → en-US
 *   - ar / ar-SA / ar-EG / ar-* → ar-SA
 *   - 其他 → null(交给上层 fallback)
 */
function matchBrowser(): AppLocale | null {
  const candidates = [navigator.language, ...(navigator.languages ?? [])]
  for (const raw of candidates) {
    if (!raw) continue
    const tag = raw.toLowerCase()
    if (tag.startsWith('zh')) return 'zh-CN'
    if (tag.startsWith('en')) return 'en-US'
    if (tag.startsWith('ar')) return 'ar-SA'
    if (tag.startsWith('ja')) return 'ja-JP'
  }
  return null
}

/**
 * 决定启动时使用的语言:
 *   localStorage > 浏览器语言 > 默认中文
 */
export function detectLocale(): AppLocale {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (isSupported(saved)) return saved
  return matchBrowser() ?? DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: detectLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
    'ar-SA': arSA,
    'ja-JP': jaJP,
  },
  // 保留 {name} 这种占位语法
  warnHtmlMessage: false,
})

/** 给 Arco ConfigProvider 用 —— 跟随 i18n 自动切换 */
export const arcoLocale = computed(() => {
  const currentLocale = i18n.global.locale.value
  if (currentLocale === 'en-US') return arcoEnUS
  if (currentLocale === 'ar-SA') return arcoArEG
  if (currentLocale === 'ja-JP') return arcoJaJP
  return arcoZhCN
})

/** 切换语言:更新 i18n + 持久化 + 更新 <html lang> */
export function setLocale(locale: AppLocale) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale
}

/** 在主入口启动时初始化 <html lang> */
export function applyInitialHtmlLang() {
  document.documentElement.lang = i18n.global.locale.value
}

export default i18n
