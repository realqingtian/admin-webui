# 开发规范

> 一份给团队成员看的「上手 + 怎么写代码」指南。读完应能在 30 分钟内提交第一个 PR。

---

## 目录

1. [本地开发](#本地开发)
2. [命名规范](#命名规范)
3. [目录组织](#目录组织)
4. [Vue 单文件组件规范](#vue-单文件组件规范)
5. [TypeScript 约定](#typescript-约定)
6. [样式约定](#样式约定)
7. [Arco 组件使用约定](#arco-组件使用约定)
8. [Pinia Store 规范](#pinia-store-规范)
9. [路由与菜单](#路由与菜单)
10. [网络请求约定](#网络请求约定)
11. [Git 提交规范](#git-提交规范)
12. [代码评审 Checklist](#代码评审-checklist)

---

## 本地开发

```bash
bun install        # 第一次拉下来跑一次
bun run dev        # 热更新开发
bun run build      # 提交 PR 前过一遍构建,确保没有 ts 错误
bunx vue-tsc -b    # 只做类型检查(更快)
```

**推荐编辑器:** VS Code,安装以下扩展(已在 `.vscode/extensions.json` 列出):

- `Vue.volar` —— Vue 官方语言服务
- `dbaeumer.vscode-eslint`(后续若引入 ESLint)
- `EditorConfig.EditorConfig` —— 跨编辑器一致

**不要**:

- ❌ 把 `bun.lock` 拉黑名单(锁文件必须提交)
- ❌ 直接改 `node_modules/` —— 改了就提 issue / 加 patch
- ❌ 在主分支直接提交 —— 永远走分支 + PR

---

## 命名规范

| 类型 | 规则 | 示例 |
| --- | --- | --- |
| 文件 - 组件/页面 | `PascalCase.vue` | `UserList.vue`、`LoginView.vue` |
| 文件 - TS 模块 | `kebab-case.ts` 或语义短名 | `request.ts`、`format-date.ts` |
| 文件 - Pinia store | 单数名词,`kebab-case.ts` | `user.ts`、`theme.ts` |
| 目录 | 复数名词或业务领域,`kebab-case` | `views/orders/`、`stores/`、`api/` |
| 路由名 `name` | 小写连字符 | `'user-list'`、`'order-detail'` |
| 路由路径 `path` | 小写连字符,复数 | `/users`、`/orders/:id` |
| 菜单 key | 单数英文 | `'dashboard'`、`'user'` |
| Vue 模板内组件 | `kebab-case` | `<user-card />`、`<a-table />` |
| Vue 模板内属性 | `kebab-case` | `:row-key="id"`、`@menu-item-click` |
| Pinia store id | store 模块名 | `'user'`、`'theme'` |
| 常量 | `UPPER_SNAKE_CASE` | `TOKEN_KEY`、`DEFAULT_PAGE_SIZE` |
| 函数/变量 | `camelCase` | `formatDate`、`handleSubmit` |
| 类型/接口 | `PascalCase`,不加 `I` 前缀 | `UserInfo`、`OrderRow` |
| 枚举 | `PascalCase`,值用 `UPPER_SNAKE_CASE` | `enum Role { ADMIN, EDITOR }` |
| CSS class | `kebab-case`,**组件内 scoped** | `.user-list-toolbar` |

**页面组件统一以 `View` 结尾**,如 `DashboardView.vue` / `LoginView.vue`,与可复用业务组件(如 `UserCard.vue`)区分。

---

## 目录组织

```
src/
├── api/           # 后端接口封装(每个模块一个文件)
├── assets/        # 走 Vite 处理的资源(图片、字体)
├── components/    # 跨页面可复用的业务组件
├── config/        # 静态配置:菜单、常量、枚举
│   └── menu.ts    # 侧栏菜单(支持一级 + 二级)
├── i18n/          # vue-i18n 多语言
│   ├── index.ts
│   └── locales/   # 每种语言一个文件:zh-CN / en-US / ar-SA / ja-JP
├── layouts/       # 整体布局组件
│   ├── AdminLayout.vue
│   ├── AppSidebar.vue  # 支持一级 + 二级菜单渲染
│   └── AppHeader.vue
├── lib/           # 与业务无关的工具函数
├── router/        # 路由表 + 守卫
├── stores/        # Pinia stores
├── styles/        # 全局样式 / 主题色覆盖
├── types/         # 全局类型(API 返回、领域模型)
└── views/         # 页面级组件,按业务模块分子目录
    └── <模块>/
        ├── <Xxx>View.vue
        ├── components/   # 仅本模块内复用的子组件
        └── composables/  # 仅本模块内复用的 composable
```

**界限**:

- `components/` 放**跨业务**通用组件 —— 至少要被两个不同模块用到才上抬
- `views/<模块>/components/` 放**仅本模块内复用**的小组件,不要为了「好看」过早抽象
- `lib/` 不依赖 Vue,纯函数;依赖 Vue 的 composable 放到 `composables/`(目前未建,需要再建)
- 一个文件超过 **300 行** 就考虑拆分
- 二级菜单的页面建议命名 `<模块><子项>View.vue`,如 `Menu1View.vue` / `Menu2View.vue`,而不是 `Menu/Sub1View.vue`(避免与子目录名混淆)

---

## Vue 单文件组件规范

**SFC 顺序固定为 `<script setup>` → `<template>` → `<style scoped>`**

```vue
<script setup lang="ts">
// 1. import:第三方 → @/ 内部 → 相对路径
import { computed, ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/stores/user'

// 2. defineProps / defineEmits
const props = defineProps<{ id: number }>()
const emit = defineEmits<{ change: [value: string] }>()

// 3. store / route / router
const userStore = useUserStore()

// 4. reactive 状态
const loading = ref(false)
const list = ref<UserRow[]>([])

// 5. computed
const total = computed(() => list.value.length)

// 6. 方法
function reload() { /* ... */ }

// 7. lifecycle / watch
// onMounted(...)
</script>

<template>
  <!-- 用 kebab-case 引用组件和属性 -->
  <a-card>
    <a-button type="primary" :loading="loading" @click="reload">
      刷新
    </a-button>
  </a-card>
</template>

<style scoped>
/* 容器 class 用模块名打头,避免冲突 */
.user-list { /* ... */ }
</style>
```

**约束**:

- 一律 `<script setup lang="ts">`,不要混用 Options API
- 一个 SFC 只导出一个组件;一个文件不要写两个 `<script>` 块(`<script setup>` 与具名 `<script>` 同存只在需要 `defineOptions` 等极少数场景)
- props/emits 用**类型语法**而非运行时声明(`defineProps<{...}>()`)
- 不要在模板里写复杂表达式,超过一行就上 `computed`
- `v-for` 必须配 `:key`,且 key 是稳定唯一 ID,不要用 `index`
- 事件回调用 `handleXxx` / `onXxx` 命名
- 模板里访问可能 undefined 的对象用 `?.`,不要用 `!`

---

## TypeScript 约定

- `tsconfig.app.json` 已开启 `noUnusedLocals` / `noUnusedParameters` / `noFallthroughCasesInSwitch`,不要 disable
- **能写类型就写类型**,不写 `any`;实在要写,用 `unknown` 然后收窄
- 公共类型放 `src/types/`,模块私有类型与代码同文件:
  ```ts
  // 同文件局部类型
  interface UserRow { id: number; name: string }
  ```
- 用 `type` 描述并集 / 元组 / 工具类型,用 `interface` 描述对象形状(更利于扩展)
- 不要给接口/类型加 `I` 前缀(`IUser` ❌ → `User` ✅)
- 函数参数对象超过 3 个字段时,封成 `interface`
- 工具:`Pick` / `Omit` / `Partial` / `ReturnType<>`,优先用 TS 内建工具型
- 路径别名只用 `@/`,不允许 `../../../` 跳出两层

---

## 样式约定

- **Arco 自带完整设计 token,直接用 `var(--color-*)`**,不要硬编码颜色
  ```css
  /* ✅ */ color: var(--color-text-1);
  /* ❌ */ color: #1d2129;
  ```
- 组件内样式一律 `<style scoped>`,**禁止**直接覆盖 Arco 全局 class
- 需要穿透 Arco 内部 class 时用 `:deep()`:
  ```css
  :deep(.arco-table-th) { background: var(--color-fill-2); }
  ```
- 间距优先用 `gap` / `padding` 而非 margin 堆叠,避免 margin collapse
- 响应式断点对齐 Arco:`xs<480`、`sm≥480`、`md≥768`、`lg≥992`、`xl≥1280`、`xxl≥1600`
- 字号 / 圆角同样取 Arco 变量,例:`var(--border-radius-medium)`

> 不打算引入 Tailwind / CSS-in-JS,保持单一样式范式。

---

## Arco 组件使用约定

- **按需加载** —— 通过 `unplugin-vue-components` + `ArcoResolver` 自动 import(配置在 `vite.config.ts`)。模板里直接写 `<a-button>` / `<icon-user>` 即可,**不要**手写 `import { Button } from '@arco-design/web-vue'`
- ⚠️ `ArcoResolver` 必须同时配 `sideEffect: true`(自动带样式)**和** `resolveIcons: true`(自动识别 `<icon-xxx>`)。漏掉 `resolveIcons: true` 控制台会刷 "Failed to resolve component: icon-xxx"
- 自动生成的全局组件类型在 [`src/components.d.ts`](../src/components.d.ts) —— **该文件自动生成,不要手动编辑**,也不要提交到代码评审时争论它
- **命令式 API**(`Message` / `Modal` / `Notification` / `ImagePreview`)resolver 检测不到,**必须在 `src/main.ts` 显式 import 一次它们的样式**:
  ```ts
  import '@arco-design/web-vue/es/message/style/css.js'
  ```
  否则运行时没有样式
- 图标统一从 `@arco-design/web-vue/es/icon` 显式 import(若需在 script 中用到):
  ```ts
  import { IconUser } from '@arco-design/web-vue/es/icon'
  ```
  模板里直接 `<icon-user />` 即可,resolver 会处理
- 主题色 / 设计 token 集中在 [`src/styles/theme.css`](../src/styles/theme.css),覆盖 Arco 的 `--primary-*` 系列 CSS 变量。详见 README「自定义品牌色」段
- 用法约定:
  | 场景 | 用法 |
  | --- | --- |
  | 成功 / 失败提示 | `Message.success()` / `Message.error()`,不要 `alert` |
  | 二次确认 | `Modal.confirm({ title, content, onOk })` |
  | 全屏 loading | `Spin` 包裹,不要自己写遮罩 |
  | 表单 | `<a-form :model :rules ref="formRef">` + `formRef.value.validate()` |
  | 表格 | `<a-table :columns :data row-key>`,所有自定义渲染用 slot |
  | 复杂筛选 | `a-form layout="inline"` + `a-card` 包裹 |
- 表单校验规则**写在 setup 内常量**,不要内联模板
- `v-model:visible` 必须搭配 `unmount-on-close`(对话框),避免内部状态污染

### Arco 菜单组件(踩坑必读)

`@arco-design/web-vue` v2.58 的 `<a-menu>` 受控用法有特定要求:

| ✅ 正确 | ❌ 错误 |
| --- | --- |
| `v-model:open-keys="openKeys"`(双向) | `:open-keys="openKeys"`(单向) |
| `@menu-item-click="..."` | `@sub-menu-toggle="..."`(v2.58 **没有**该事件) |
| `@sub-menu-click="..."`(子菜单标题点击) | 自己监听 click DOM 事件 |

- **必须用 `v-model:open-keys`**:arCO 内部 toggle 子菜单展开态时会 emit `update:openKeys`,单向绑定会导致外层 ref 永远不更新、UI 也不响应。
- **没有 `sub-menu-toggle` 事件**:V2.58 的 emit 只有 `collapse` / `update:collapsed` / `update:selectedKeys` / `update:openKeys` / `menu-item-click` / `sub-menu-click`。不要照搬 1.x / 其他版本示例。
- **二级菜单项的 key**:在 `menu-item-click` 回调里拿到的 key 是子项的 `key`(如 `'menu1'`),**不是**父项的。需要去 `menu.ts` 的 `children` 里查找再 push 路由。
- **侧栏折叠态**:折叠时子菜单会变成 popup 浮层,这种情况下 arco 自管;但为了避免折叠前残留的 openKeys 干扰,推荐在 `watch(collapsed, v => v && (openKeys.value = []))` 主动清空。
- **手动控制(可选)**:若需"同时只展开一个一级菜单组"(手风琴行为),`v-model:open-keys` 接 `ref<string[]>([])`,在路由变化 / 用户点击时把它写成一个长度为 1 的数组即可。

参考实现:[`src/layouts/AppSidebar.vue`](../src/layouts/AppSidebar.vue)。

---

## Pinia Store 规范

- **使用 setup 写法**,不要 options 写法:
  ```ts
  export const useUserStore = defineStore('user', () => {
    const token = ref('')
    function login(/* ... */) { /* ... */ }
    return { token, login }
  })
  ```
- 一个 store 一个文件,文件名 = store 名(`user.ts` ↔ `useUserStore`)
- store 内只放**跨组件共享的状态**;只在一个组件用的状态留在组件 `ref` 即可
- 持久化使用 `watchEffect + localStorage`,避免引入 `pinia-plugin-persistedstate` 直到第 3 个 store 需要它
- 命名:
  - 选项:`useXxxStore`
  - localStorage key 统一前缀 `admin-webui:<topic>`(避免与其他应用冲突)
- 异步动作返回 `Promise`,组件里用 `try / catch / finally` 处理 loading

---

## 路由与菜单

- 路由表集中在 `src/router/index.ts`,**不要**分文件管理(规模超过 30 条再考虑拆分)
- 每条路由必须有:
  ```ts
  {
    path: 'orders',
    name: 'orders',
    component: () => import('@/views/orders/OrdersView.vue'),
    meta: { title: '订单管理', requiresAuth: true },
  }
  ```
- 路由必须**懒加载**(`() => import(...)`),提高首屏速度
- 受保护路由必须 `meta.requiresAuth: true`,否则守卫不会拦
- 菜单项一律加进 `src/config/menu.ts`;若是详情页不要进菜单(可在路由 meta 加 `hideInMenu: true` 表达意图,虽然当前菜单只读 menu.ts)
- 面包屑由 Header 从 `route.matched[*].meta.title` 自动拼,所以**所有有页面的路由都要写 title**

### 二级菜单(子菜单)

`src/config/menu.ts` 中给 `MenuItem` 加可选 `children` 字段,自动用 `<a-sub-menu>` 渲染。

```ts
// src/config/menu.ts
import type { Component } from 'vue'
import { IconMenu } from '@arco-design/web-vue/es/icon'

export interface SubMenuItem {
  key: string
  /** i18n key,如 'menu.menu1' */
  title: string
  path: string
}

export interface MenuItem {
  key: string
  title: string         // i18n key
  icon: Component
  path: string          // 有 children 时,作为父级默认路径(用于 redirect / 前缀匹配)
  children?: SubMenuItem[]
}
```

**示例 —— 完整的一级 + 二级菜单配置**:

```ts
{
  key: 'menu-demo',
  title: 'menu.menuDemo',
  icon: IconMenu,
  path: '/menu-demo',
  children: [
    { key: 'menu1', title: 'menu.menu1', path: '/menu-demo/menu1' },
    { key: 'menu2', title: 'menu.menu2', path: '/menu-demo/menu2' },
    { key: 'menu3', title: 'menu.menu3', path: '/menu-demo/menu3' },
  ],
}
```

**配套路由** —— 用嵌套路由 + 父级 `redirect`:

```ts
// src/router/index.ts
{
  path: 'menu-demo',
  name: 'menu-demo',
  redirect: '/menu-demo/menu1',                       // 父级直接落子项
  component: () => import('@/views/menu-demo/MenuDemoView.vue'),
  meta: { title: 'menu.menuDemo', requiresAuth: true },
  children: [
    {
      path: 'menu1',
      name: 'menu1',
      component: () => import('@/views/menu-demo/Menu1View.vue'),
      meta: { title: 'menu.menu1', requiresAuth: true },
    },
    // menu2 / menu3 同上
  ],
}
```

**侧栏 AppSidebar 的处理**([`src/layouts/AppSidebar.vue`](../src/layouts/AppSidebar.vue)):

- 渲染:遍历 `menuItems`,有 `children` 用 `<a-sub-menu>`,无 `children` 用 `<a-menu-item>`
- 选中态:二级路径命中 → 用子项 key 选中;否则按父项 path 前缀兜底
- 展开态:`v-model:open-keys` 与 arco 双向绑定,路由变化时主动同步一次,侧栏折叠时清空
- 路由切换:点击子项触发 `menu-item-click`,key 是**子项的 key**(不是父项的),要去 `children` 里查 path 再 `router.push`

**多语言**:`src/i18n/locales/*.ts` 的 `menu` 段同时加父 + 子的 key,子页面的文案放在 `menuDemo.menu1` / `menuDemo.menu2` 等命名空间下。

---

## 网络请求约定

> 当前项目尚未引入 axios / ofetch,本节给出推荐骨架。

```ts
// src/api/request.ts
import { Message } from '@arco-design/web-vue'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export async function request<T>(
  path: string,
  init?: RequestInit & { silent?: boolean },
): Promise<T> {
  const token = localStorage.getItem('admin-webui:token')
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  })
  if (!res.ok) {
    if (!init?.silent) Message.error(`请求失败:${res.status}`)
    throw new Error(`HTTP ${res.status}`)
  }
  return res.json()
}
```

```ts
// src/api/user.ts
import { request } from './request'

export interface User { id: number; name: string; email: string }

export const userApi = {
  list: () => request<User[]>('/users'),
  detail: (id: number) => request<User>(`/users/${id}`),
  create: (data: Omit<User, 'id'>) =>
    request<User>('/users', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<User>) =>
    request<User>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id: number) =>
    request<void>(`/users/${id}`, { method: 'DELETE' }),
}
```

**约束**:

- API 函数返回值类型必须显式声明,不要靠推断
- 错误集中在拦截器里 `Message.error`,组件不需要重复提示
- 401 / 403 在拦截器统一处理(清 token + 跳 `/login`)
- 不要把后端字段名直接透传给 UI —— 在 API 层做一次映射(字段重命名、枚举翻译)
- 文件上传用 `FormData`,不要把 `Content-Type` 写死

---

## 国际化(i18n)约定

- 词条文件位置:`src/i18n/locales/{zh-CN,en-US,ar-SA,ja-JP}.ts`,**每加一个 key 四个文件都要补**
- **键名分层**:`menu.xxx` / `example.xxx` / `image.xxx` / `menuDemo.menu1.xxx` —— 按页面 / 模块命名空间分层
- **路由 `meta.title` 与菜单 `title` 必须用 i18n key**(如 `menu.dashboard`),模板 / 面包屑里再 `t()` 解析,切语言时自动同步
- **避免硬编码**:模板里写死的英文字符串是 bug 隐患,新人 PR 评审会被拦
- **复数 / 占位符**:
  ```ts
  // 定义
  time: { minutesAgo: '{n} 分钟前' }
  // 使用
  t('time.minutesAgo', { n: 5 })  // → "5 分钟前"
  ```
- **RTL 语言**(如阿拉伯语):Arco 的 `ConfigProvider` 会自动给 `<html dir="rtl">`,组件 layout 会跟着翻;**不要**自己在样式里加 `direction: rtl`
- **新增语言的步骤**:
  1. 拷贝 `en-US.ts` → `xx-XX.ts`,翻译所有 `value`
  2. `src/i18n/index.ts` 注册新 locale(导入 + 加到 messages)
  3. `src/i18n/index.ts` 的语言识别规则里加 `xx*` 匹配
  4. `src/i18n/index.ts` 给 `ConfigProvider` 加 `locale: arcoLocale['xx-XX']`(若 arco 没提供就回退英文)
  5. `src/components/LanguageSwitch.vue` 的下拉里加一项

---

## Arco 组件 demo 页规范

项目内 `/image` `/upload` `/menu-demo/*` 是组件 / 菜单用法示例,**不是业务页**。新增示例页时请遵守:

- 一个示例页对应**一个组件 / 一个特性**,不要把多个不相关的组件堆一页
- 用 `a-card` 切分多个 section,每个 card 顶部用 `t('<demo>.sections.<name>')` 标题
- 简短说明放在 `a-alert` 里,让用户一眼明白这段代码演示什么
- 文案统一用 i18n,不要硬编码中英文

---

## Git 提交规范

采用 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/):

```
<type>(<scope>): <subject>

<body 可选>

<footer 可选>
```

**type** 取值:

| type | 说明 |
| --- | --- |
| `feat` | 新功能 |
| `fix` | bug 修复 |
| `refactor` | 重构(无功能变更) |
| `perf` | 性能优化 |
| `style` | 仅样式/格式调整 |
| `docs` | 文档变更 |
| `test` | 测试相关 |
| `chore` | 构建、依赖、杂项 |
| `revert` | 回滚 |

**scope** 用模块名,如 `login` / `dashboard` / `router` / `deps`。

**subject** 用祈使句,首字母小写,结尾不加句号。

示例:

```
feat(orders): 新增订单导出 Excel 功能
fix(login): 修复 token 过期后未跳转登录页
refactor(layout): 拆分 AdminLayout 为 Sidebar + Header
chore(deps): 升级 @arco-design/web-vue 到 2.59.0
docs: 补充新增页面的步骤说明
```

**分支策略**:

- `main` —— 生产分支,只接 PR,不直接提交
- `feature/<模块>-<简述>` —— 新功能,如 `feature/orders-export`
- `fix/<模块>-<简述>` —— 修 bug
- `chore/<简述>` —— 文档 / 构建 / 依赖

PR 要点:

- 标题用 Conventional Commits 同款格式
- 描述里说明 **改了什么 + 为什么改 + 怎么测的**
- 改了 UI 贴前后截图
- 通过 `bun run build`(本地或 CI)再合并

---

## 代码评审 Checklist

提 PR 前自查,评审时按这个看:

**功能**

- [ ] 跑得起来,主流程没断
- [ ] 浅色 / 深色都看过
- [ ] 移动端宽度(<768px)不至于崩
- [ ] 有 loading、空状态、错误状态

**代码**

- [ ] `bunx vue-tsc -b` 无报错
- [ ] 没引入未使用的 import / 变量
- [ ] 没有 `console.log` / `debugger`
- [ ] 没有硬编码 token / URL / 密钥
- [ ] 复杂逻辑有简短注释解释「为什么」,而不是「做什么」

**风格**

- [ ] 文件 / 变量命名符合本规范
- [ ] 颜色用 Arco 变量,不硬编码 hex
- [ ] 跨模块复用的组件提到 `components/`
- [ ] 单文件没超过 300 行

**安全**

- [ ] 用户输入未直接拼接到 `innerHTML` / `v-html`
- [ ] 接口字段没在前端做权限判断(权限以后端为准)

---

## 后续可扩展

下面这些目前**没引入**,等真正需要时再加,不要为「显得规范」而引入:

- ESLint + Prettier:团队人多时再加
- Husky + lint-staged:配合 ESLint
- Vitest:有可测试的纯函数后加
- Playwright:核心流程上线前加 e2e
- 国际化(`@arco-design/web-vue/es/locale`):有多语言需求再加
- 微前端 / Module Federation:体量超过 20 个模块再考虑

---

最后更新:2026-06-05
