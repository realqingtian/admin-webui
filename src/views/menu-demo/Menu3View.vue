<script setup lang="ts">
/**
 * 二级菜单 —— 子项 3
 * 展示表格 + 表单 + 操作反馈,演示二级菜单下"内容可交互"
 */
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Message, Modal, type FormInstance } from '@arco-design/web-vue'
import MenuDemoNav from './MenuDemoNav.vue'

const { t } = useI18n()

interface Note {
  id: number
  title: string
  tag: 'work' | 'life' | 'study'
  done: boolean
  createdAt: string
}

const tagColor: Record<Note['tag'], string> = {
  work: 'arcoblue',
  life: 'green',
  study: 'orangered',
}

const notes = ref<Note[]>([
  { id: 1, title: t('menuDemo.menu3.sample.0.t'), tag: 'work', done: false, createdAt: '2026-05-21' },
  { id: 2, title: t('menuDemo.menu3.sample.1.t'), tag: 'life', done: true, createdAt: '2026-05-22' },
  { id: 3, title: t('menuDemo.menu3.sample.2.t'), tag: 'study', done: false, createdAt: '2026-05-23' },
])

const columns = [
  { title: t('menuDemo.menu3.cols.id'), dataIndex: 'id', width: 70 },
  { title: t('menuDemo.menu3.cols.title'), dataIndex: 'title' },
  { title: t('menuDemo.menu3.cols.tag'), dataIndex: 'tag', slotName: 'tag', width: 110 },
  { title: t('menuDemo.menu3.cols.done'), dataIndex: 'done', slotName: 'done', width: 110 },
  { title: t('menuDemo.menu3.cols.time'), dataIndex: 'createdAt', width: 130 },
  { title: t('menuDemo.menu3.cols.actions'), slotName: 'actions', width: 130, align: 'right' as const },
]

const formRef = ref<FormInstance>()
const form = reactive({ title: '', tag: 'work' as Note['tag'] })
const rules = {
  title: [{ required: true, message: t('menuDemo.menu3.rules.titleRequired') }],
}

function add() {
  formRef.value?.validate((errors) => {
    if (errors) return
    const nextId = Math.max(0, ...notes.value.map((n) => n.id)) + 1
    notes.value.unshift({
      id: nextId,
      title: form.title,
      tag: form.tag,
      done: false,
      createdAt: new Date().toISOString().slice(0, 10),
    })
    form.title = ''
    form.tag = 'work'
    Message.success(t('menuDemo.menu3.addSuccess'))
  })
}

function toggle(n: Note) {
  n.done = !n.done
  Message.info(
    n.done ? t('menuDemo.menu3.markedDone') : t('menuDemo.menu3.markedUndo'),
  )
}

function remove(n: Note) {
  Modal.confirm({
    title: t('menuDemo.menu3.deleteTitle'),
    content: t('menuDemo.menu3.deleteContent', { title: n.title }),
    okButtonProps: { status: 'danger' },
    onOk: () => {
      notes.value = notes.value.filter((x) => x.id !== n.id)
      Message.success(t('menuDemo.menu3.deleteSuccess'))
    },
  })
}
</script>

<template>
  <div class="menu3-page">
    <MenuDemoNav />

    <a-card :bordered="false" :title="t('menuDemo.menu3.title')">
      <a-alert type="warning" :show-icon="false">
        {{ t('menuDemo.menu3.intro') }}
      </a-alert>

      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        layout="inline"
        class="add-form"
      >
        <a-form-item field="title" :label="t('menuDemo.menu3.form.title')">
          <a-input
            v-model="form.title"
            :placeholder="t('menuDemo.menu3.form.titlePlaceholder')"
            style="width: 260px"
            allow-clear
          />
        </a-form-item>
        <a-form-item field="tag" :label="t('menuDemo.menu3.form.tag')">
          <a-select v-model="form.tag" style="width: 140px">
            <a-option value="work">{{ t('menuDemo.menu3.tag.work') }}</a-option>
            <a-option value="life">{{ t('menuDemo.menu3.tag.life') }}</a-option>
            <a-option value="study">{{ t('menuDemo.menu3.tag.study') }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="add">
            <template #icon><icon-plus /></template>
            {{ t('menuDemo.menu3.add') }}
          </a-button>
        </a-form-item>
      </a-form>

      <a-table
        :columns="columns"
        :data="notes"
        row-key="id"
        :pagination="false"
        :bordered="false"
        stripe
      >
        <template #tag="{ record }">
          <a-tag :color="tagColor[(record as Note).tag]">
            {{ t(`menuDemo.menu3.tag.${(record as Note).tag}`) }}
          </a-tag>
        </template>
        <template #done="{ record }">
          <a-badge
            :status="(record as Note).done ? 'success' : 'normal'"
            :text="(record as Note).done ? t('menuDemo.menu3.done') : t('menuDemo.menu3.undone')"
          />
        </template>
        <template #actions="{ record }">
          <a-space>
            <a-link @click="toggle(record as Note)">
              {{ t('menuDemo.menu3.toggle') }}
            </a-link>
            <a-link status="danger" @click="remove(record as Note)">
              {{ t('menuDemo.menu3.delete') }}
            </a-link>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<style scoped>
.menu3-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.add-form {
  margin: 16px 0;
}
</style>
