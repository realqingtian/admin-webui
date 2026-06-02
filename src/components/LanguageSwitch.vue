<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { setLocale, SUPPORTED_LOCALES, type AppLocale } from '@/i18n'

const { t, locale } = useI18n()

const options: { value: AppLocale; label: string }[] = SUPPORTED_LOCALES.map(
  (l) => ({
    value: l,
    label: l === 'zh-CN' ? '简体中文' : 'English',
  }),
)

function onSelect(
  value: string | number | Record<string, unknown> | undefined,
) {
  if (
    typeof value === 'string' &&
    (SUPPORTED_LOCALES as readonly string[]).includes(value)
  ) {
    setLocale(value as AppLocale)
  }
}
</script>

<template>
  <a-dropdown trigger="click" @select="onSelect">
    <a-tooltip :content="t('layout.lang.tooltip')">
      <a-button shape="circle">
        <template #icon><icon-language /></template>
      </a-button>
    </a-tooltip>
    <template #content>
      <a-doption v-for="opt in options" :key="opt.value" :value="opt.value">
        <template v-if="locale === opt.value" #icon>
          <icon-check />
        </template>
        {{ opt.label }}
      </a-doption>
    </template>
  </a-dropdown>
</template>
