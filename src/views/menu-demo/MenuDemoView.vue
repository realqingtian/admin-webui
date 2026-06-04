<script setup lang="ts">
/**
 * 二级菜单 —— 父级默认页
 * 如果用户直接访问 /menu-demo 或一级菜单配置了跳转,落在这里
 * 实际渲染由子路由决定,这里只是占位/重定向前的 fallback
 */
import { useI18n } from 'vue-i18n'
import MenuDemoNav from './MenuDemoNav.vue'

const { t } = useI18n()
</script>

<template>
  <div class="menu-demo-fallback">
    <MenuDemoNav />
    <a-empty :description="t('menuDemo.fallback')" />
  </div>
</template>

<style scoped>
.menu-demo-fallback {
  padding: 40px 0;
}
</style>
