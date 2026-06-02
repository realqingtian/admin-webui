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
  <div class="sidebar-menu">
    <a-menu
      :selected-keys="selectedKeys"
      :style="{ borderRight: 0 }"
      @menu-item-click="handleMenuClick"
    >
      <a-menu-item v-for="item in menuItems" :key="item.key">
        <template #icon>
          <component :is="item.icon" />
        </template>
        {{ t(item.title) }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<style scoped>
/*
 * 外层 .sidebar-menu 占满 sider 中 logo 之外的剩余空间(flex: 1)。
 * 菜单不写死 height,自然贴合容器高度,不再因 height: 100% 溢出触发滚动条。
 * min-height: 0 是 flex 子项允许收缩到比内容更小的关键,否则会被内容撑大。
 * overflow-y: auto 让未来菜单项增多时,滚动条出现在 wrapper 内(贴近侧边),
 * 而不是把整个 sider 撑出页面滚动条。
 */
.sidebar-menu {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
</style>
