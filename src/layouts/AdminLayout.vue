<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSidebarStore } from '@/stores/sidebar'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

const { t } = useI18n()
const sidebarStore = useSidebarStore()
const collapsed = computed(() => sidebarStore.collapsed)
</script>

<template>
  <a-layout class="admin-layout">
    <a-layout-sider
      class="sider"
      :width="220"
      :collapsed-width="60"
      :collapsed="collapsed"
      hide-trigger
      breakpoint="lg"
      @collapse="(val: boolean) => (sidebarStore.collapsed = val)"
    >
      <!-- logo -->
      <div class="logo">
        <icon-thunderbolt :size="22" :style="{ color: 'rgb(var(--primary-6))' }" />
        <span v-if="!collapsed" class="logo-text">Admin WebUI</span>
      </div>
      <!-- 菜单 -->
      <AppSidebar />
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="header">
        <AppHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <RouterView v-slot="{ Component }">
          <component :is="Component" />
        </RouterView>
      </a-layout-content>
      <a-layout-footer class="footer">
        {{ t('layout.footer') }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.admin-layout {
  height: 100vh;
}

.sider {
  background: var(--color-bg-2);
  border-right: 1px solid var(--color-border);
  transition: width 0.2s;
  /* 让 logo 占固定高度、菜单占剩余空间,避免菜单 100% 高溢出触发滚动条 */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid var(--color-border);
  overflow: hidden;
}
.logo-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-1);
  white-space: nowrap;
}

.header {
  height: 60px;
  padding: 0;
  background: transparent;
}

.content {
  padding: 20px;
  overflow-y: auto;
  background: var(--color-fill-2);
}

.footer {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-2);
  color: var(--color-text-3);
  font-size: 12px;
  border-top: 1px solid var(--color-border);
}
</style>
