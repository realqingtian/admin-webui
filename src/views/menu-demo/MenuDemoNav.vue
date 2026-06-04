<script setup lang="ts">
/**
 * 二级菜单导航条 —— 放在每个子页顶部
 * 用色块 + 按钮让"页面切换了没"一眼可见:
 *  - 当前页:大号实心按钮,带 ✓ 标记
 *  - 其他页:描边按钮,点击 router.push
 *  - 顶部彩色徽标显示当前 key
 */
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

interface NavItem {
  /** 路由前缀 —— 命中时即"当前页" */
  match: string
  /** i18n key,如 'menu.menu1' */
  titleKey: string
  /** 按钮颜色 */
  color: string
}

const items: NavItem[] = [
  { match: '/menu-demo/menu1', titleKey: 'menu.menu1', color: '#165DFF' },
  { match: '/menu-demo/menu2', titleKey: 'menu.menu2', color: '#0FC6C2' },
  { match: '/menu-demo/menu3', titleKey: 'menu.menu3', color: '#722ED1' },
]

function isActive(match: string) {
  return route.path === match
}

function go(match: string) {
  if (route.path !== match) router.push(match)
}
</script>

<template>
  <div class="menu-demo-nav">
    <div class="nav-header">
      <a-tag color="arcoblue" size="medium">
        {{ t('menuDemo.nav.tag') }}
      </a-tag>
      <span class="nav-title">{{ t('menuDemo.nav.title') }}</span>
      <a-tag color="gray">
        {{ t('menuDemo.nav.current') }}:<b style="margin-left: 4px">{{ t('menu.menuDemo') }}</b>
        /
        <b style="margin-left: 4px">
          {{ t(items.find((i) => isActive(i.match))?.titleKey ?? 'menu.menuDemo') }}
        </b>
      </a-tag>
    </div>
    <a-space :size="12" wrap>
      <a-button
        v-for="item in items"
        :key="item.match"
        :type="isActive(item.match) ? 'primary' : 'outline'"
        :style="{
          minWidth: '140px',
          ...(isActive(item.match)
            ? { backgroundColor: item.color, borderColor: item.color }
            : { color: item.color, borderColor: item.color }),
        }"
        @click="go(item.match)"
      >
        <template #icon>
          <icon-check v-if="isActive(item.match)" />
          <icon-right v-else />
        </template>
        {{ t(item.titleKey) }}
        <span v-if="isActive(item.match)" class="badge">
          {{ t('menuDemo.nav.active') }}
        </span>
      </a-button>
    </a-space>
  </div>
</template>

<style scoped>
.menu-demo-nav {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px 20px;
  background: linear-gradient(
    135deg,
    var(--color-bg-2) 0%,
    var(--color-fill-2) 100%
  );
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

.nav-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 14px;
  color: var(--color-text-2);
}

.nav-title {
  font-weight: 600;
  color: var(--color-text-1);
}

.badge {
  margin-left: 6px;
  padding: 0 6px;
  font-size: 12px;
  line-height: 16px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 8px;
}
</style>
