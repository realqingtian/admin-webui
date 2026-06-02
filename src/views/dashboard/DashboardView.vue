<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

type OrderStatus = 'pending' | 'toShip' | 'shipped' | 'completed' | 'refunded'
type RelativeUnit = 'minutes' | 'hours'

// 顶部 4 个统计卡(label 取 i18n key,渲染时再 t)
const stats = computed(() => [
  {
    title: t('dashboard.stats.revenue'),
    value: 248920,
    prefix: '¥',
    delta: 12.4,
  },
  { title: t('dashboard.stats.newUsers'), value: 1203, delta: 8.2 },
  { title: t('dashboard.stats.totalOrders'), value: 8621, delta: -2.1 },
  { title: t('dashboard.stats.activeUsers'), value: 32450, delta: 4.7 },
])

// 销售柱状图(纯 div 模拟,真实项目接 ECharts)
const bars = [40, 65, 52, 78, 60, 90, 72, 85, 68, 95, 80, 88]

// 最近订单(status 存 key,relativeTime 用结构化数据 -> i18n)
interface RecentOrder {
  id: string
  user: string
  amount: number
  status: OrderStatus
  time: { unit: RelativeUnit; n: number }
}

const recent = reactive<RecentOrder[]>([
  { id: 'ORD-20260601', user: '张三',   amount: 1280, status: 'shipped',  time: { unit: 'minutes', n: 12 } },
  { id: 'ORD-20260530', user: '李四',   amount: 480,  status: 'pending',  time: { unit: 'minutes', n: 34 } },
  { id: 'ORD-20260530', user: '王五',   amount: 3200, status: 'completed',time: { unit: 'hours', n: 1 } },
  { id: 'ORD-20260529', user: '赵六',   amount: 760,  status: 'refunded', time: { unit: 'hours', n: 3 } },
  { id: 'ORD-20260529', user: 'Emily', amount: 2100, status: 'toShip',   time: { unit: 'hours', n: 5 } },
])

const statusColor: Record<OrderStatus, string> = {
  pending: 'orange',
  toShip: 'orangered',
  shipped: 'arcoblue',
  completed: 'green',
  refunded: 'red',
}

const statusLabel = (s: OrderStatus) => t(`dashboard.status.${s}`)
const relativeLabel = (r: RecentOrder['time']) =>
  t(`time.${r.unit}Ago`, { n: r.n })

const columns = computed(() => [
  { title: t('dashboard.table.cols.id'), dataIndex: 'id' },
  { title: t('dashboard.table.cols.customer'), dataIndex: 'user' },
  { title: t('dashboard.table.cols.amount'), dataIndex: 'amount', slotName: 'amount' },
  { title: t('dashboard.table.cols.status'), dataIndex: 'status', slotName: 'status' },
  { title: t('dashboard.table.cols.time'), dataIndex: 'time', slotName: 'time' },
])
</script>

<template>
  <div class="dashboard">
    <!-- 顶部统计卡 -->
    <a-grid :cols="{ xs: 1, sm: 2, md: 2, lg: 4 }" :col-gap="16" :row-gap="16">
      <a-grid-item v-for="s in stats" :key="s.title">
        <a-card :bordered="false" hoverable>
          <a-statistic
            :title="s.title"
            :value="s.value"
            :precision="0"
            show-group-separator
          >
            <template v-if="s.prefix" #prefix>{{ s.prefix }}</template>
          </a-statistic>
          <div class="delta">
            <a-tag :color="s.delta >= 0 ? 'green' : 'red'" size="small">
              <icon-arrow-rise v-if="s.delta >= 0" />
              <icon-arrow-fall v-else />
              {{ Math.abs(s.delta) }}%
            </a-tag>
            <span class="delta-text">{{ t('dashboard.stats.compare') }}</span>
          </div>
        </a-card>
      </a-grid-item>
    </a-grid>

    <!-- 中间区:图表 + 最近订单 -->
    <a-grid
      :cols="{ xs: 1, md: 1, lg: 3 }"
      :col-gap="16"
      :row-gap="16"
      class="mid"
    >
      <a-grid-item :span="{ xs: 1, md: 1, lg: 2 }">
        <a-card :bordered="false" :title="t('dashboard.chart.title')">
          <template #extra>
            <a-tag color="arcoblue">{{ t('dashboard.chart.unit') }}</a-tag>
          </template>
          <div class="chart">
            <div
              v-for="(v, i) in bars"
              :key="i"
              class="bar"
              :style="{ height: v + '%' }"
            />
          </div>
          <div class="chart-axis">
            <span v-for="m in 12" :key="m">
              {{ t('dashboard.chart.monthLabel', { n: m }) }}
            </span>
          </div>
        </a-card>
      </a-grid-item>

      <a-grid-item>
        <a-card :bordered="false" :title="t('dashboard.recent.title')">
          <a-list :data="recent" :bordered="false" size="small">
            <template #item="{ item }">
              <a-list-item>
                <a-list-item-meta>
                  <template #title>
                    <span class="rec-title">{{ item.id }}</span>
                  </template>
                  <template #description>
                    {{ item.user }} · {{ relativeLabel(item.time) }}
                  </template>
                </a-list-item-meta>
                <template #actions>
                  <span class="rec-amount">¥ {{ item.amount.toLocaleString() }}</span>
                  <a-tag :color="statusColor[item.status as OrderStatus]" size="small">
                    {{ statusLabel(item.status) }}
                  </a-tag>
                </template>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-grid-item>
    </a-grid>

    <!-- 下方:订单表格 -->
    <a-card :bordered="false" :title="t('dashboard.table.title')" class="mid">
      <a-table
        :columns="columns"
        :data="recent"
        :pagination="false"
        :bordered="false"
      >
        <template #amount="{ record }">
          ¥ {{ (record as RecentOrder).amount.toLocaleString() }}
        </template>
        <template #status="{ record }">
          <a-tag :color="statusColor[(record as RecentOrder).status]">
            {{ statusLabel((record as RecentOrder).status) }}
          </a-tag>
        </template>
        <template #time="{ record }">
          {{ relativeLabel((record as RecentOrder).time) }}
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.delta {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}
.delta-text {
  color: var(--color-text-3);
}

.mid {
  margin-top: 0;
}

.chart {
  height: 220px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 8px 0;
}
.bar {
  flex: 1;
  background: linear-gradient(180deg, rgb(var(--primary-6)), rgb(var(--primary-4)));
  border-radius: 4px 4px 0 0;
  transition: opacity 0.2s;
  min-height: 8px;
}
.bar:hover {
  opacity: 0.85;
}
.chart-axis {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  font-size: 12px;
  color: var(--color-text-3);
  text-align: center;
  margin-top: 8px;
}

.rec-title {
  font-family: var(--font-family-code, monospace);
  font-size: 13px;
}
.rec-amount {
  font-weight: 500;
  color: var(--color-text-1);
}
</style>
