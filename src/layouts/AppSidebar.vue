<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { menuItems } from '@/config/menu'
import { useSidebarStore } from '@/stores/sidebar'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const sidebarStore = useSidebarStore()

const collapsed = computed(() => sidebarStore.collapsed)

/**
 * 选中态:
 *  - 二级菜单命中,selectedKeys = 子菜单 key
 *  - 一级菜单(无 children)命中,selectedKeys = 一级菜单 key
 *  - 都没命中,取 path 前缀最长匹配的一项(让侧栏的"当前"始终有一行被高亮)
 */
const selectedKeys = computed(() => {
  const path = route.path
  for (const item of menuItems) {
    if (item.children?.some((c) => c.path === path)) {
      return [item.children.find((c) => c.path === path)!.key]
    }
  }
  const direct = menuItems.find((i) => !i.children && i.path === path)
  if (direct) return [direct.key]
  // 前缀兜底:用于菜单组的父级(虽然实际上二级路由会优先匹配)
  const prefix = menuItems.find((i) => path.startsWith(i.path))
  return prefix ? [prefix.key] : []
})

/**
 * 展开态:用 v-model:open-keys 与 <a-menu> 双向绑定
 *  - arco 内部会在用户点击 sub-menu 标题时自动 toggle,再 emit update:openKeys
 *  - 我们只需要在路由变化 / 侧栏折叠时主动同步一次
 *  - 互斥:同时只展开一个一级菜单组
 */
const openKeys = ref<string[]>([])

function findGroupKey(path: string): string | undefined {
  return menuItems.find(
    (i) => i.children && i.children.some(() => path.startsWith(i.path)),
  )?.key
}

// 首次进入:把当前路由所在的一级菜单展开
{
  const k = findGroupKey(route.path)
  if (k) openKeys.value = [k]
}

// 路由变化时:落点如在某个二级菜单内,自动展开其一级菜单(且与其他组互斥)
watch(
  () => route.path,
  (path) => {
    const k = findGroupKey(path)
    if (k) openKeys.value = [k]
  },
)

// 侧栏折叠:收起所有展开项(避免折叠态下残留展开)
watch(collapsed, (val) => {
  if (val) openKeys.value = []
})

function handleMenuClick(key: string) {
  // 优先按子项匹配(二级菜单项的 key 是 child.key,如 'menu1')
  for (const item of menuItems) {
    const child = item.children?.find((c) => c.key === key)
    if (child) {
      if (child.path !== route.path) router.push(child.path)
      return
    }
  }
  // 否则按一级菜单处理
  const item = menuItems.find((i) => i.key === key)
  if (item && !item.children && item.path !== route.path) {
    router.push(item.path)
  }
}
</script>

<template>
  <div class="sidebar-menu">
    <a-menu
      v-model:open-keys="openKeys"
      :selected-keys="selectedKeys"
      :style="{ borderRight: 0 }"
      :collapsed="collapsed"
      :collapsed-width="60"
      show-collapse-tooltip
      @menu-item-click="handleMenuClick"
    >
      <template v-for="item in menuItems" :key="item.key">
        <!-- 带二级子菜单 -->
        <a-sub-menu v-if="item.children?.length" :key="item.key">
          <template #icon>
            <component :is="item.icon" />
          </template>
          <template #title>
            {{ t(item.title) }}
          </template>
          <a-menu-item v-for="child in item.children" :key="child.key">
            {{ t(child.title) }}
          </a-menu-item>
        </a-sub-menu>
        <!-- 普通一级菜单 -->
        <a-menu-item v-else :key="item.key">
          <template #icon>
            <component :is="item.icon" />
          </template>
          {{ t(item.title) }}
        </a-menu-item>
      </template>
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
