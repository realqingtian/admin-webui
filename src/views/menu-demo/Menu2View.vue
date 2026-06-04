<script setup lang="ts">
/**
 * 二级菜单 —— 子项 2
 * 展示一段信息架构(Tabs + 描述列表),演示多内容切换
 */
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import MenuDemoNav from './MenuDemoNav.vue'

const { t } = useI18n()

const activeTab = ref<'overview' | 'spec' | 'faq'>('overview')

interface DescItem {
  label: string
  value: string
}
const overviewData = computed<DescItem[]>(() => [
  { label: t('menuDemo.menu2.desc.name'), value: t('menuDemo.menu2.values.name') },
  { label: t('menuDemo.menu2.desc.category'), value: t('menuDemo.menu2.values.category') },
  { label: t('menuDemo.menu2.desc.author'), value: t('menuDemo.menu2.values.author') },
  { label: t('menuDemo.menu2.desc.updated'), value: t('menuDemo.menu2.values.updated') },
])

const specData = computed<DescItem[]>(() => [
  { label: t('menuDemo.menu2.spec.version'), value: 'v2.58.0' },
  { label: t('menuDemo.menu2.spec.size'), value: '~636 KB (gzip)' },
  { label: t('menuDemo.menu2.spec.style'), value: 'BEM + CSS Variables' },
  { label: t('menuDemo.menu2.spec.license'), value: 'MIT' },
])

const faqList = computed(() => [
  { q: t('menuDemo.menu2.faq.q1'), a: t('menuDemo.menu2.faq.a1') },
  { q: t('menuDemo.menu2.faq.q2'), a: t('menuDemo.menu2.faq.a2') },
  { q: t('menuDemo.menu2.faq.q3'), a: t('menuDemo.menu2.faq.a3') },
])
</script>

<template>
  <div class="menu2-page">
    <MenuDemoNav />

    <a-card :bordered="false" :title="t('menuDemo.menu2.title')">
      <a-alert type="success" :show-icon="false">
        {{ t('menuDemo.menu2.intro') }}
      </a-alert>

      <a-tabs v-model:active-key="activeTab" class="tabs">
        <a-tab-pane key="overview" :title="t('menuDemo.menu2.tabOverview')">
          <a-descriptions
            :data="overviewData"
            :column="2"
            size="large"
            :title="t('menuDemo.menu2.overviewTitle')"
          >
            <template #value="{ value }">{{ value }}</template>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="spec" :title="t('menuDemo.menu2.tabSpec')">
          <a-descriptions :data="specData" :column="2" size="large">
            <template #value="{ value }">{{ value }}</template>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="faq" :title="t('menuDemo.menu2.tabFaq')">
          <a-collapse :default-active-key="['0']" :bordered="false">
            <a-collapse-item v-for="(f, i) in faqList" :key="i" :header="f.q">
              {{ f.a }}
            </a-collapse-item>
          </a-collapse>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<style scoped>
.menu2-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.tabs {
  margin-top: 16px;
}
</style>
