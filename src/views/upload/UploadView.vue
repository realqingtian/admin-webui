<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Message } from '@arco-design/web-vue'
import type { FileItem } from '@arco-design/web-vue'

const { t } = useI18n()

// ============ 基础上传 ============
const basicFileList = ref<FileItem[]>([])

// ============ 拖拽上传 ============
const dragFileList = ref<FileItem[]>([])

// ============ 照片墙 ============
const imageFileList = ref<FileItem[]>([])

// ============ 限制条件上传 ============
const limitFileList = ref<FileItem[]>([])

// ============ 手动上传 ============
const manualFileList = ref<FileItem[]>([])

// ============ 自定义上传（模拟） ============
function customUpload(option: any) {
  const { onProgress, onSuccess, fileItem } = option
  const total = 100
  let progress = 0

  const interval = setInterval(() => {
    progress += Math.random() * 25
    if (progress >= total) {
      progress = total
      clearInterval(interval)
      onSuccess()
      Message.success(t('upload.messages.success', { name: fileItem.name }))
    }
    onProgress(progress / total, event)
  }, 300)

  return {
    abort() {
      clearInterval(interval)
    },
  }
}
</script>

<template>
  <div class="upload-page">
    <!-- 基础用法 -->
    <a-card :bordered="false" :title="t('upload.sections.basic')">
      <a-space direction="vertical" :size="12" fill>
        <a-typography-text type="secondary">
          {{ t('upload.descriptions.basic') }}
        </a-typography-text>
        <a-upload
          v-model:file-list="basicFileList"
          action="/api/upload"
          :custom-request="customUpload"
          :auto-upload="true"
        />
      </a-space>
    </a-card>

    <!-- 拖拽上传 -->
    <a-card :bordered="false" :title="t('upload.sections.drag')">
      <a-space direction="vertical" :size="12" fill>
        <a-typography-text type="secondary">
          {{ t('upload.descriptions.drag') }}
        </a-typography-text>
        <a-upload
          v-model:file-list="dragFileList"
          action="/api/upload"
          :custom-request="customUpload"
          draggable
          :auto-upload="true"
        />
      </a-space>
    </a-card>

    <!-- 照片墙 -->
    <a-card :bordered="false" :title="t('upload.sections.photoWall')">
      <a-space direction="vertical" :size="12" fill>
        <a-typography-text type="secondary">
          {{ t('upload.descriptions.photoWall') }}
        </a-typography-text>
        <a-upload
          v-model:file-list="imageFileList"
          action="/api/upload"
          :custom-request="customUpload"
          list-type="picture-card"
          :auto-upload="true"
          image-preview
          :limit="8"
        />
      </a-space>
    </a-card>

    <!-- 限制条件 -->
    <a-card :bordered="false" :title="t('upload.sections.restrictions')">
      <a-space direction="vertical" :size="12" fill>
        <a-typography-text type="secondary">
          {{ t('upload.descriptions.restrictions') }}
        </a-typography-text>
        <a-upload
          v-model:file-list="limitFileList"
          action="/api/upload"
          :custom-request="customUpload"
          accept="image/png,image/jpeg,image/gif"
          :limit="3"
          :auto-upload="true"
        />
      </a-space>
    </a-card>

    <!-- 手动上传 -->
    <a-card :bordered="false" :title="t('upload.sections.manual')">
      <a-space direction="vertical" :size="12" fill>
        <a-typography-text type="secondary">
          {{ t('upload.descriptions.manual') }}
        </a-typography-text>
        <a-upload
          v-model:file-list="manualFileList"
          action="/api/upload"
          :custom-request="customUpload"
          :auto-upload="false"
        />
      </a-space>
    </a-card>
  </div>
</template>

<style scoped>
.upload-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
