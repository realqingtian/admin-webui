<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Message, Modal, type FormInstance } from '@arco-design/web-vue'

const { t } = useI18n()

// ===== 数据 =====
interface UserRow {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'disabled'
  createdAt: string
}

const mockUsers: UserRow[] = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'active', createdAt: '2025-08-12' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'editor', status: 'active', createdAt: '2025-09-01' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'viewer', status: 'disabled', createdAt: '2025-10-23' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'viewer', status: 'active', createdAt: '2025-11-15' },
  { id: 5, name: 'Emily', email: 'emily@example.com', role: 'editor', status: 'active', createdAt: '2025-12-04' },
  { id: 6, name: 'Daniel', email: 'daniel@example.com', role: 'viewer', status: 'active', createdAt: '2026-01-09' },
  { id: 7, name: 'Sophia', email: 'sophia@example.com', role: 'viewer', status: 'disabled', createdAt: '2026-02-18' },
  { id: 8, name: '陈七', email: 'chenqi@example.com', role: 'admin', status: 'active', createdAt: '2026-03-22' },
]

const data = ref<UserRow[]>([...mockUsers])
const loading = ref(false)

// ===== 筛选 =====
const search = reactive({
  keyword: '',
  role: '',
  status: '',
})

const filtered = computed(() => {
  const k = search.keyword.trim().toLowerCase()
  return data.value.filter((u) => {
    if (k && !u.name.toLowerCase().includes(k) && !u.email.toLowerCase().includes(k))
      return false
    if (search.role && u.role !== search.role) return false
    if (search.status && u.status !== search.status) return false
    return true
  })
})

function resetSearch() {
  search.keyword = ''
  search.role = ''
  search.status = ''
}

function reload() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    Message.success(t('example.toolbar.refreshSuccess'))
  }, 400)
}

// ===== 表格列 =====
const columns = computed(() => [
  { title: t('example.cols.id'), dataIndex: 'id', width: 70 },
  { title: t('example.cols.name'), dataIndex: 'name' },
  { title: t('example.cols.email'), dataIndex: 'email' },
  { title: t('example.cols.role'), dataIndex: 'role', slotName: 'role', width: 110 },
  { title: t('example.cols.status'), dataIndex: 'status', slotName: 'status', width: 110 },
  { title: t('example.cols.createdAt'), dataIndex: 'createdAt', width: 140 },
  { title: t('example.cols.actions'), slotName: 'actions', width: 160, align: 'right' as const },
])

const roleColor: Record<UserRow['role'], string> = {
  admin: 'red',
  editor: 'arcoblue',
  viewer: 'gray',
}
const roleLabel = (r: UserRow['role']) => t(`example.role.${r}`)
const statusLabel = (s: UserRow['status']) => t(`example.status.${s}`)

// ===== 新增 / 编辑 =====
const modalVisible = ref(false)
const modalMode = ref<'create' | 'edit'>('create')
const formRef = ref<FormInstance>()

const form = reactive<UserRow>({
  id: 0,
  name: '',
  email: '',
  role: 'viewer',
  status: 'active',
  createdAt: '',
})

const rules = computed(() => ({
  name: [{ required: true, message: t('example.modal.rules.nameRequired') }],
  email: [
    { required: true, message: t('example.modal.rules.emailRequired') },
    { type: 'email' as const, message: t('example.modal.rules.emailFormat') },
  ],
}))

function openCreate() {
  modalMode.value = 'create'
  Object.assign(form, {
    id: 0,
    name: '',
    email: '',
    role: 'viewer',
    status: 'active',
    createdAt: '',
  })
  modalVisible.value = true
}

function openEdit(row: UserRow) {
  modalMode.value = 'edit'
  Object.assign(form, row)
  modalVisible.value = true
}

async function handleBeforeOk(): Promise<boolean> {
  const errors = await formRef.value?.validate()
  if (errors) return false
  if (modalMode.value === 'create') {
    const nextId = Math.max(0, ...data.value.map((d) => d.id)) + 1
    data.value.unshift({
      ...form,
      id: nextId,
      createdAt: new Date().toISOString().slice(0, 10),
    })
    Message.success(t('example.create.success'))
  } else {
    const idx = data.value.findIndex((d) => d.id === form.id)
    if (idx >= 0) data.value[idx] = { ...form }
    Message.success(t('example.update.success'))
  }
  return true
}

function handleDelete(row: UserRow) {
  Modal.confirm({
    title: t('example.delete.title'),
    content: t('example.delete.content', { name: row.name }),
    okButtonProps: { status: 'danger' },
    onOk: () => {
      data.value = data.value.filter((d) => d.id !== row.id)
      Message.success(t('example.delete.success'))
    },
  })
}
</script>

<template>
  <div class="example-page">
    <!-- 搜索条 -->
    <a-card :bordered="false">
      <a-form :model="search" layout="inline">
        <a-form-item :label="t('example.search.keyword')">
          <a-input
            v-model="search.keyword"
            :placeholder="t('example.search.keywordPlaceholder')"
            allow-clear
            style="width: 220px"
          />
        </a-form-item>
        <a-form-item :label="t('example.search.role')">
          <a-select
            v-model="search.role"
            :placeholder="t('example.search.all')"
            allow-clear
            style="width: 140px"
          >
            <a-option value="admin">{{ t('example.role.admin') }}</a-option>
            <a-option value="editor">{{ t('example.role.editor') }}</a-option>
            <a-option value="viewer">{{ t('example.role.viewer') }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="t('example.search.status')">
          <a-select
            v-model="search.status"
            :placeholder="t('example.search.all')"
            allow-clear
            style="width: 140px"
          >
            <a-option value="active">{{ t('example.status.active') }}</a-option>
            <a-option value="disabled">{{ t('example.status.disabled') }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary">
              <template #icon><icon-search /></template>
              {{ t('common.search') }}
            </a-button>
            <a-button @click="resetSearch">
              <template #icon><icon-refresh /></template>
              {{ t('common.reset') }}
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>

    <!-- 表格 -->
    <a-card :bordered="false" class="table-card">
      <div class="table-toolbar">
        <a-space>
          <a-button type="primary" @click="openCreate">
            <template #icon><icon-plus /></template>
            {{ t('example.toolbar.add') }}
          </a-button>
          <a-button>
            <template #icon><icon-download /></template>
            {{ t('example.toolbar.export') }}
          </a-button>
        </a-space>
        <a-tooltip :content="t('example.toolbar.refresh')">
          <a-button shape="circle" :loading="loading" @click="reload">
            <template #icon><icon-refresh /></template>
          </a-button>
        </a-tooltip>
      </div>

      <a-table
        :columns="columns"
        :data="filtered"
        :loading="loading"
        :pagination="{ pageSize: 5, showTotal: true }"
        row-key="id"
        :bordered="false"
        stripe
      >
        <template #role="{ record }">
          <a-tag :color="roleColor[(record as UserRow).role]">
            {{ roleLabel((record as UserRow).role) }}
          </a-tag>
        </template>
        <template #status="{ record }">
          <a-badge
            :status="(record as UserRow).status === 'active' ? 'success' : 'normal'"
            :text="statusLabel((record as UserRow).status)"
          />
        </template>
        <template #actions="{ record }">
          <a-space>
            <a-link @click="openEdit(record as UserRow)">
              {{ t('example.actions.edit') }}
            </a-link>
            <a-link status="danger" @click="handleDelete(record as UserRow)">
              {{ t('example.actions.delete') }}
            </a-link>
          </a-space>
        </template>
      </a-table>
    </a-card>

    <!-- 新增/编辑 Modal -->
    <a-modal
      v-model:visible="modalVisible"
      :title="modalMode === 'create' ? t('example.modal.titleCreate') : t('example.modal.titleEdit')"
      :on-before-ok="handleBeforeOk"
      unmount-on-close
    >
      <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
        <a-form-item field="name" :label="t('example.modal.fields.name')">
          <a-input
            v-model="form.name"
            :placeholder="t('example.modal.placeholders.name')"
          />
        </a-form-item>
        <a-form-item field="email" :label="t('example.modal.fields.email')">
          <a-input v-model="form.email" placeholder="user@example.com" />
        </a-form-item>
        <a-form-item field="role" :label="t('example.modal.fields.role')">
          <a-select v-model="form.role">
            <a-option value="admin">{{ t('example.role.admin') }}</a-option>
            <a-option value="editor">{{ t('example.role.editor') }}</a-option>
            <a-option value="viewer">{{ t('example.role.viewer') }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="status" :label="t('example.modal.fields.status')">
          <a-radio-group v-model="form.status">
            <a-radio value="active">{{ t('example.status.active') }}</a-radio>
            <a-radio value="disabled">{{ t('example.status.disabled') }}</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped>
.example-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.table-card .table-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
</style>
