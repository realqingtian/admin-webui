<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, SUPPORTED_LOCALES, type AppLocale } from '@/i18n'

const { t, locale } = useI18n()

const LOCALE_FLAGS: Record<AppLocale, string> = {
  'zh-CN': '🇨🇳',
  'en-US': '🇺🇸',
  'ar-SA': '🇸🇦',
  'ja-JP': '🇯🇵',
}

const options = computed(() =>
  SUPPORTED_LOCALES.map((l) => ({
    value: l,
    flag: LOCALE_FLAGS[l],
    label:
      l === 'zh-CN'
        ? t('layout.lang.zhCN')
        : l === 'en-US'
          ? t('layout.lang.enUS')
          : l === 'ar-SA'
            ? t('layout.lang.arSA')
            : t('layout.lang.jaJP'),
  })),
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
        {{ opt.flag }} {{ opt.label }}
      </a-doption>
    </template>
  </a-dropdown>
</template>
