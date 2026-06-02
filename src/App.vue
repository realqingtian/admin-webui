<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { arcoLocale } from '@/i18n'

// 切换语言时同步刷新 document.title(基于当前路由)
const { t, locale } = useI18n()
const route = useRoute()

function applyDocTitle() {
  const key = route.meta?.title as string | undefined
  const page = key ? t(key) : ''
  const app = t('app.name')
  document.title = page ? `${page} · ${app}` : app
}

watch(() => route.fullPath, applyDocTitle, { immediate: true })
watch(locale, applyDocTitle)
</script>

<template>
  <a-config-provider :locale="arcoLocale">
    <RouterView />
  </a-config-provider>
</template>
