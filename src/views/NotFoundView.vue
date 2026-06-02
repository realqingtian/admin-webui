<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <div class="not-found">
    <a-result
      status="404"
      :title="t('notFound.title')"
      :subtitle="t('notFound.subtitle')"
    >
      <template #extra>
        <a-space>
          <a-button type="primary" @click="router.replace('/')">
            {{ t('notFound.home') }}
          </a-button>
          <a-button @click="router.back()">
            {{ t('notFound.prev') }}
          </a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--color-fill-2);
  padding: 24px;
}

/* 放大 Arco 自带的 404 插画 ——
   默认 svg 大约 90×90,放到 280 让"资源找不到"插画更醒目 */
.not-found :deep(.arco-result-icon) {
  margin-bottom: 16px;
  line-height: 1;
}
.not-found :deep(.arco-result-icon) svg {
  width: 280px;
  height: auto;
}

/* 同步放大标题和副标题,与大图配比 */
.not-found :deep(.arco-result-title) {
  font-size: 22px;
  margin-top: 8px;
}
.not-found :deep(.arco-result-subtitle) {
  font-size: 14px;
}
</style>
