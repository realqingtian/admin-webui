<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'

const { t } = useI18n()
const themeStore = useThemeStore()
const isDark = computed(() => themeStore.theme === 'dark')
</script>

<template>
  <a-tooltip
    :content="isDark ? t('layout.theme.toLight') : t('layout.theme.toDark')"
  >
    <a-button shape="circle" @click="themeStore.toggle()">
      <template #icon>
        <icon-sun-fill v-if="isDark" />
        <icon-moon-fill v-else />
      </template>
    </a-button>
  </a-tooltip>
</template>
