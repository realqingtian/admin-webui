<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { menuItems } from '@/config/menu'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const selectedKeys = computed(() => {
  const m = menuItems.find((i) => route.path.startsWith(i.path))
  return m ? [m.key] : []
})

function handleMenuClick(key: string) {
  const item = menuItems.find((i) => i.key === key)
  if (item && item.path !== route.path) {
    router.push(item.path)
  }
}
</script>

<template>
  <a-menu
    :selected-keys="selectedKeys"
    :style="{ height: '100%', borderRight: 0 }"
    @menu-item-click="handleMenuClick"
  >
    <a-menu-item v-for="item in menuItems" :key="item.key">
      <template #icon>
        <component :is="item.icon" />
      </template>
      {{ t(item.title) }}
    </a-menu-item>
  </a-menu>
</template>
