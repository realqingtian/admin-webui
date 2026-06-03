<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 多图预览
const current = ref(0)
const groupVisible = ref(false)

const groupImages = [
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e09497e63671e6e425e7a1b0db7a3b3c.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee385a4ef4ec7eb81ea8e0db0e0a2f4.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3a776882ee19d5e55c7f258c2a78e0c2.png~tplv-uwbnlip3yd-webp.webp',
]

const fitList: Array<'contain' | 'cover' | 'fill' | 'none' | 'scale-down'> = [
  'contain',
  'cover',
  'fill',
  'none',
  'scale-down',
]
</script>

<template>
  <div class="image-page">
    <!-- 基础用法 -->
    <a-card :bordered="false" :title="t('image.sections.basic')">
      <a-space :size="24" wrap>
        <a-image
          width="200"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
          :alt="t('image.sections.basic')"
        />
      </a-space>
    </a-card>

    <!-- 不同填充模式 -->
    <a-card :bordered="false" :title="t('image.sections.fit')">
      <a-space :size="24" wrap>
        <div v-for="fit in fitList" :key="fit" class="fit-item">
          <a-image
            width="160"
            height="160"
            :src="'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'"
            :fit="fit"
            :title="fit"
          />
          <div class="fit-label">{{ fit }}</div>
        </div>
      </a-space>
    </a-card>

    <!-- 带标题和描述 -->
    <a-card :bordered="false" :title="t('image.sections.caption')">
      <a-space :size="24" wrap>
        <a-image
          width="200"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
          :title="t('image.caption.title')"
          :description="t('image.caption.inner')"
        />
        <a-image
          width="200"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
          :title="t('image.caption.title')"
          :description="t('image.caption.outer')"
          footer-position="outer"
        />
      </a-space>
    </a-card>

    <!-- 多图预览 -->
    <a-card :bordered="false" :title="t('image.sections.group')">
      <a-space :size="16" wrap>
        <a-image
          v-for="(src, idx) in groupImages"
          :key="idx"
          width="120"
          height="120"
          :src="src"
          :alt="`${t('image.sections.group')} ${idx + 1}`"
          @click=";((current = idx), (groupVisible = true))"
        />
      </a-space>
      <a-image-preview-group
        v-model:current="current"
        v-model:visible="groupVisible"
        :src-list="groupImages"
        infinite
      />
    </a-card>

    <!-- 加载与错误状态 -->
    <a-card :bordered="false" :title="t('image.sections.states')">
      <a-space :size="24" wrap>
        <!-- 带加载效果 -->
        <a-image
          width="200"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
          show-loader
          :title="t('image.states.loading')"
        />
        <!-- 错误状态 -->
        <a-image
          width="200"
          src="https://example.com/broken-image.jpg"
          :title="t('image.states.error')"
        >
          <template #error>
            <div class="image-error">
              <icon-image :size="32" />
              <span>{{ t('image.states.errorText') }}</span>
            </div>
          </template>
        </a-image>
        <!-- 无预览 -->
        <a-image
          width="200"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
          :preview="false"
          :title="t('image.states.noPreview')"
        />
      </a-space>
    </a-card>
  </div>
</template>

<style scoped>
.image-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.fit-label {
  font-size: 13px;
  color: var(--color-text-3);
}

.image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
  color: var(--color-text-3);
  background-color: var(--color-fill-2);
  border-radius: 4px;
}
</style>
