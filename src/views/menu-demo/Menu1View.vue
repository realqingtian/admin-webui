<script setup lang="ts">
/**
 * 二级菜单 —— 子项 1
 * 展示卡片 + 计数器,演示进入二级菜单后页面切换正常
 */
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Message } from '@arco-design/web-vue'
import MenuDemoNav from './MenuDemoNav.vue'

const { t } = useI18n()

const count = ref(0)
function increment() {
  count.value += 1
  Message.info(`${t('menuDemo.menu1.counter')}：${count.value}`)
}
function reset() {
  count.value = 0
  Message.success(t('menuDemo.menu1.resetTip'))
}

const features = [
  { key: 'a', icon: 'icon-check', text: 'menuDemo.menu1.features.a' },
  { key: 'b', icon: 'icon-check', text: 'menuDemo.menu1.features.b' },
  { key: 'c', icon: 'icon-check', text: 'menuDemo.menu1.features.c' },
  { key: 'd', icon: 'icon-check', text: 'menuDemo.menu1.features.d' },
]
</script>

<template>
  <div class="menu1-page">
    <MenuDemoNav />

    <a-card :bordered="false" :title="t('menuDemo.menu1.title')">
      <a-alert type="info">
        {{ t('menuDemo.menu1.intro') }}
      </a-alert>

      <a-row :gutter="16" class="row">
        <a-col :span="12">
          <a-card :title="t('menuDemo.menu1.counterCard')" :bordered="false">
            <a-space direction="vertical" size="large" style="width: 100%">
              <div class="big-number">{{ count }}</div>
              <a-space>
                <a-button type="primary" @click="increment">
                  <template #icon><icon-plus /></template>
                  {{ t('menuDemo.menu1.add') }}
                </a-button>
                <a-button @click="reset">
                  <template #icon><icon-refresh /></template>
                  {{ t('menuDemo.menu1.reset') }}
                </a-button>
              </a-space>
            </a-space>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card :title="t('menuDemo.menu1.featuresCard')" :bordered="false">
            <a-space direction="vertical" size="medium">
              <div v-for="f in features" :key="f.key" class="feature">
                <icon-check-circle-fill :size="18" style="color: rgb(var(--primary-6))" />
                <span>{{ t(f.text) }}</span>
              </div>
            </a-space>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<style scoped>
.menu1-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.row {
  margin-top: 16px;
}
.big-number {
  font-size: 56px;
  font-weight: 600;
  text-align: center;
  color: rgb(var(--primary-6));
  line-height: 1.2;
}
.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-2);
}
</style>
