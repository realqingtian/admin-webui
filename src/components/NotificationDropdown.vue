<script setup lang="ts">
/**
 * 通知中心 —— 顶部铃铛 popover,带分类 tab、列表、标记已读、全部已读、清空
 */
import { computed, ref, type Component } from 'vue'
import { useI18n } from 'vue-i18n'
import { Message } from '@arco-design/web-vue'
import {
  IconMessage,
  IconExclamationCircleFill,
  IconClockCircle,
} from '@arco-design/web-vue/es/icon'

const { t } = useI18n()

type NotifType = 'message' | 'notice' | 'todo'

interface Notif {
  id: number
  type: NotifType
  titleKey: string
  descKey: string
  time: { unit: 'minutes' | 'hours'; n: number }
  read: boolean
}

// ===== mock 数据 =====
const list = ref<Notif[]>([
  {
    id: 1,
    type: 'message',
    titleKey: 'notif.list.newComment.title',
    descKey: 'notif.list.newComment.desc',
    time: { unit: 'minutes', n: 5 },
    read: false,
  },
  {
    id: 2,
    type: 'message',
    titleKey: 'notif.list.dm.title',
    descKey: 'notif.list.dm.desc',
    time: { unit: 'minutes', n: 20 },
    read: false,
  },
  {
    id: 3,
    type: 'notice',
    titleKey: 'notif.list.upgrade.title',
    descKey: 'notif.list.upgrade.desc',
    time: { unit: 'hours', n: 1 },
    read: false,
  },
  {
    id: 4,
    type: 'notice',
    titleKey: 'notif.list.security.title',
    descKey: 'notif.list.security.desc',
    time: { unit: 'hours', n: 3 },
    read: true,
  },
  {
    id: 5,
    type: 'todo',
    titleKey: 'notif.list.review.title',
    descKey: 'notif.list.review.desc',
    time: { unit: 'hours', n: 6 },
    read: false,
  },
  {
    id: 6,
    type: 'todo',
    titleKey: 'notif.list.report.title',
    descKey: 'notif.list.report.desc',
    time: { unit: 'hours', n: 12 },
    read: true,
  },
])

// ===== Tab 状态 =====
type TabKey = 'all' | NotifType
const activeTab = ref<TabKey>('all')

const typeIcon: Record<NotifType, Component> = {
  message: IconMessage,
  notice: IconExclamationCircleFill,
  todo: IconClockCircle,
}
const typeColor: Record<NotifType, string> = {
  message: 'rgb(var(--arcoblue-6))',
  notice: 'rgb(var(--warning-6))',
  todo: 'rgb(var(--success-6))',
}

const tabs = computed<{ key: TabKey; label: string; count: number }[]>(() => [
  { key: 'all', label: t('notif.tabs.all'), count: unreadCount.value },
  {
    key: 'message',
    label: t('notif.tabs.message'),
    count: list.value.filter((n) => n.type === 'message' && !n.read).length,
  },
  {
    key: 'notice',
    label: t('notif.tabs.notice'),
    count: list.value.filter((n) => n.type === 'notice' && !n.read).length,
  },
  {
    key: 'todo',
    label: t('notif.tabs.todo'),
    count: list.value.filter((n) => n.type === 'todo' && !n.read).length,
  },
])

const filtered = computed(() =>
  activeTab.value === 'all'
    ? list.value
    : list.value.filter((n) => n.type === activeTab.value),
)

const unreadCount = computed(() => list.value.filter((n) => !n.read).length)

function relativeTime(time: Notif['time']) {
  return t(`time.${time.unit}Ago`, { n: time.n })
}

function markRead(item: Notif) {
  if (item.read) return
  item.read = true
  Message.success(t('notif.toast.itemRead'))
}

function markAllRead() {
  if (!unreadCount.value) return
  list.value.forEach((n) => (n.read = true))
  Message.success(t('notif.toast.markedAllRead'))
}

function clear() {
  if (!list.value.length) return
  list.value = []
  Message.success(t('notif.toast.cleared'))
}

const popupVisible = ref(false)
function viewAll() {
  Message.info(t('notif.viewAll'))
  popupVisible.value = false
}
</script>

<template>
  <a-popover
    v-model:popup-visible="popupVisible"
    trigger="click"
    position="br"
    :content-style="{ padding: 0, width: '380px' }"
  >
    <a-badge :count="unreadCount" :max-count="99" :offset="[-2, 2]">
      <a-tooltip :content="t('notif.tooltip')">
        <a-button shape="circle">
          <template #icon><icon-notification /></template>
        </a-button>
      </a-tooltip>
    </a-badge>

    <template #content>
      <div class="notif-panel">
        <!-- 自定义 tabs(比 a-tabs 轻量,样式更可控) -->
        <div class="notif-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            class="notif-tab"
            :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            <span>{{ tab.label }}</span>
            <a-badge
              v-if="tab.count > 0"
              :count="tab.count"
              :max-count="99"
              class="notif-tab-badge"
            />
          </button>
        </div>

        <!-- 列表 -->
        <div v-if="filtered.length" class="notif-list">
          <div
            v-for="item in filtered"
            :key="item.id"
            class="notif-item"
            :class="{ unread: !item.read }"
            @click="markRead(item)"
          >
            <div class="notif-icon" :style="{ color: typeColor[item.type] }">
              <component :is="typeIcon[item.type]" />
            </div>
            <div class="notif-body">
              <div class="notif-title">{{ t(item.titleKey) }}</div>
              <div class="notif-desc">{{ t(item.descKey) }}</div>
              <div class="notif-time">{{ relativeTime(item.time) }}</div>
            </div>
            <span v-if="!item.read" class="notif-dot" />
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else class="notif-empty">
          <a-empty :description="t('notif.empty')" />
        </div>

        <!-- 底部操作 -->
        <div class="notif-footer">
          <a-button
            type="text"
            size="mini"
            :disabled="!unreadCount"
            @click="markAllRead"
          >
            {{ t('notif.markAllRead') }}
          </a-button>
          <a-button
            type="text"
            size="mini"
            status="danger"
            :disabled="!list.length"
            @click="clear"
          >
            {{ t('notif.clear') }}
          </a-button>
          <a-button type="text" size="mini" @click="viewAll">
            {{ t('notif.viewAll') }}
          </a-button>
        </div>
      </div>
    </template>
  </a-popover>
</template>

<style scoped>
.notif-panel {
  display: flex;
  flex-direction: column;
  max-height: 480px;
}

/* ===== tabs ===== */
.notif-tabs {
  display: flex;
  gap: 4px;
  padding: 8px 8px 0;
  border-bottom: 1px solid var(--color-border);
}
.notif-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 0;
  background: transparent;
  color: var(--color-text-2);
  font-size: 13px;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: color 0.2s;
}
.notif-tab:hover {
  color: var(--color-text-1);
}
.notif-tab.active {
  color: rgb(var(--primary-6));
  font-weight: 500;
}
.notif-tab.active::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: -1px;
  height: 2px;
  background: rgb(var(--primary-6));
  border-radius: 2px;
}
.notif-tab-badge {
  --badge-text-size: 10px;
}

/* ===== 列表 ===== */
.notif-list {
  flex: 1;
  overflow-y: auto;
  max-height: 360px;
}
.notif-item {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: background 0.15s;
}
.notif-item:last-child {
  border-bottom: 0;
}
.notif-item:hover {
  background: var(--color-fill-2);
}
.notif-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-fill-2);
  border-radius: 50%;
  font-size: 16px;
}
.notif-body {
  flex: 1;
  min-width: 0;
}
.notif-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-1);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.notif-item.unread .notif-title {
  color: var(--color-text-1);
}
.notif-item:not(.unread) .notif-title,
.notif-item:not(.unread) .notif-desc {
  color: var(--color-text-3);
}
.notif-desc {
  font-size: 12px;
  color: var(--color-text-2);
  line-height: 1.5;
  margin-top: 2px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.notif-time {
  font-size: 11px;
  color: var(--color-text-3);
  margin-top: 4px;
}
.notif-dot {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  margin-top: 12px;
  background: rgb(var(--danger-6));
  border-radius: 50%;
}

/* ===== empty ===== */
.notif-empty {
  padding: 24px 16px;
}

/* ===== footer ===== */
.notif-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-2);
}
</style>
