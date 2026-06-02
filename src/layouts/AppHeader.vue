<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Message, Modal } from '@arco-design/web-vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useUserStore } from '@/stores/user'
import LanguageSwitch from '@/components/LanguageSwitch.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
import NotificationDropdown from '@/components/NotificationDropdown.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const sidebarStore = useSidebarStore()
const userStore = useUserStore()

const collapsed = computed(() => sidebarStore.collapsed)

// 面包屑:首页 + 路由 matched 链上有 title 的节点
const breadcrumbs = computed(() => {
  const items: string[] = [t('breadcrumb.home')]
  for (const r of route.matched) {
    const key = r.meta?.title as string | undefined
    if (key) {
      const text = t(key)
      if (!items.includes(text)) items.push(text)
    }
  }
  return items
})

function onUserCommand(
  value: string | number | Record<string, unknown> | undefined,
) {
  if (value === 'profile') {
    Message.info(t('layout.user.profileInfo'))
  } else if (value === 'logout') {
    Modal.confirm({
      title: t('layout.logout.title'),
      content: t('layout.logout.content'),
      okText: t('layout.logout.ok'),
      cancelText: t('layout.logout.cancel'),
      onOk: () => {
        userStore.logout()
        Message.success(t('layout.logout.success'))
        router.replace('/login')
      },
    })
  }
}
</script>

<template>
  <div class="app-header">
    <!-- 左:折叠按钮 + 面包屑 -->
    <div class="left">
      <a-button class="trigger" size="small" @click="sidebarStore.toggle()">
        <template #icon>
          <icon-menu-unfold v-if="collapsed" />
          <icon-menu-fold v-else />
        </template>
      </a-button>

      <a-breadcrumb class="crumb">
        <a-breadcrumb-item v-for="(c, i) in breadcrumbs" :key="i">
          {{ c }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <!-- 右:语言 + 主题 + 通知 + 用户 -->
    <div class="right">
      <LanguageSwitch />
      <ThemeSwitch />
      <NotificationDropdown />

      <a-dropdown trigger="click" @select="onUserCommand">
        <div class="user">
          <a-avatar :size="32" :style="{ backgroundColor: '#165DFF' }">
            <icon-user />
          </a-avatar>
          <span class="user-name">
            {{ userStore.userInfo?.name ?? t('layout.user.defaultName') }}
          </span>
          <icon-down />
        </div>
        <template #content>
          <a-doption value="profile">
            <template #icon><icon-user /></template>
            {{ t('layout.user.profile') }}
          </a-doption>
          <a-doption value="logout">
            <template #icon><icon-export /></template>
            {{ t('layout.user.logout') }}
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  background: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}
.left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.crumb {
  font-size: 14px;
}
.right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.user {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s;
}
.user:hover {
  background: var(--color-fill-2);
}
.user-name {
  font-size: 14px;
  color: var(--color-text-1);
}
</style>
