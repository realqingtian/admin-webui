# Admin WebUI

> 基于 Vue 3 + Vite + Arco Design Vue 的中后台管理系统模板。

包含登录、路由守卫、可折叠侧栏布局(支持**二级菜单**)、面包屑、主题切换(浅色 / 深色)、状态持久化,以及 CRUD 示例、Image / Upload 组件示例、二级菜单示例。所有数据均为本地 mock,接 API 时替换 `views/*` 中的数据来源即可。

## ✨ 特性

- ⚡ **Vite 8** + **Vue 3.5** + **TypeScript 6** —— 现代化构建链路
- 🎨 **Arco Design Vue 2.58** —— 字节跳动出品的中后台组件库
- 🧭 **Vue Router 4** + **Pinia 2** —— 路由守卫 + 模块化状态
- 🧩 **多级侧栏** —— 支持一级菜单 + 二级子菜单的展开 / 收起 / 切换,折叠态下二级以浮层显示
- 🛡️ **登录流程** —— `localStorage` 持久化 token,未登录自动重定向
- 🌍 **国际化** —— 简体中文 / English / العربية / 日本語 四语,首次启动按浏览器语言识别,fallback 中文
- 🌗 **深色模式** —— 切换 `body[arco-theme=dark]` 属性,跟随系统偏好
- 📦 **按需加载 + 主题定制** —— `unplugin-vue-components` + `ArcoResolver`,只打包用到的 Arco 组件,主色调可通过 CSS 变量一键覆盖
- 📐 **Arco Pro 风格布局** —— 可折叠 Sider + Header 面包屑 + Content
- 📦 **路径别名 `@/`** —— 统一指向 `src/`
- 🌐 **局域网访问** —— Vite `host: 0.0.0.0`,Network 地址同事可直连

## 🛠 技术栈

| 类别 | 选型 |
| --- | --- |
| 包管理 | [Bun](https://bun.sh) ≥ 1.3 |
| 构建工具 | Vite 8 |
| 框架 | Vue 3.5(`<script setup>`) |
| 语言 | TypeScript 6 |
| UI 组件库 | @arco-design/web-vue 2.58 |
| 路由 | vue-router 4 |
| 状态管理 | pinia 2 |
| 国际化 | vue-i18n 9 |
| 类型检查 | vue-tsc |

## 📋 环境要求

| 工具 | 版本 |
| --- | --- |
| Node.js | ≥ 18(仅作为底层运行时,实际命令走 Bun) |
| Bun | ≥ 1.3 |
| 浏览器 | Chrome / Edge / Safari / Firefox 现代版本 |

> 若用 npm / pnpm / yarn 替代 Bun,自行把下面命令里的 `bun` 替换即可,`bun.lock` 可保留或删除。

## 🚀 快速开始

```bash
# 安装依赖
bun install

# 启动开发服务器(默认端口 5173,自动让位)
bun run dev

# 类型检查 + 生产构建,产物在 dist/
bun run build

# 本地预览生产产物(端口 4173)
bun run preview
```

启动后控制台会同时打印两条地址:

```
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.x.x:5173/
```

把 **Network** 那条发给同局域网的同事即可直接访问。

> 默认登录:`admin` / `admin123`(任意账号密码都能登录,演示用)

## 📁 项目结构

```
admin-webui/
├── public/                 # 静态资源,直接拷贝到 dist
│   └── favicon.svg
├── src/
│   ├── App.vue             # 根组件,只渲染 <RouterView/>
│   ├── main.ts             # 入口:Pinia + Router + ArcoVue
│   ├── style.css           # 全局极简重置
│   ├── components.d.ts     # 自动生成的组件类型(勿手改)
│   ├── config/
│   │   └── menu.ts         # 侧栏菜单数据(支持二级子菜单)
│   ├── i18n/
│   │   ├── index.ts        # i18n 入口 + 浏览器语言识别 + Arco locale
│   │   └── locales/
│   │       ├── zh-CN.ts    #   简体中文
│   │       ├── en-US.ts    #   English
│   │       ├── ar-SA.ts    #   العربية
│   │       └── ja-JP.ts    #   日本語
│   ├── styles/
│   │   └── theme.css       # 主题色覆盖(Arco CSS 变量)
│   ├── router/
│   │   └── index.ts        # 路由表 + 登录守卫
│   ├── stores/             # Pinia stores
│   │   ├── user.ts         #   token + 用户信息(localStorage)
│   │   ├── theme.ts        #   light/dark 主题
│   │   └── sidebar.ts      #   侧栏折叠
│   ├── layouts/
│   │   ├── AdminLayout.vue # Pro 风格:Sider + Header + Content + Footer
│   │   ├── AppSidebar.vue  #   菜单(支持一级 + 二级)
│   │   └── AppHeader.vue   #   折叠按钮、面包屑、主题、通知、用户
│   ├── components/         # 跨页面可复用业务组件
│   │   ├── LanguageSwitch.vue
│   │   ├── NotificationDropdown.vue
│   │   └── ThemeSwitch.vue
│   └── views/
│       ├── login/LoginView.vue        # 登录页
│       ├── dashboard/DashboardView.vue# 控制台
│       ├── example/ExampleView.vue    # CRUD 示例
│       ├── image/ImageView.vue        # Image 组件示例
│       ├── upload/UploadView.vue      # Upload 组件示例
│       ├── menu-demo/                 # 二级菜单示例
│       │   ├── MenuDemoView.vue       #   父级占位(默认重定向到 menu1)
│       │   ├── MenuDemoNav.vue        #   页面切换演示条(3 个子页通用)
│       │   ├── Menu1View.vue          #   菜单 1:计数器
│       │   ├── Menu2View.vue          #   菜单 2:Tabs + 描述列表
│       │   └── Menu3View.vue          #   菜单 3:迷你记事本
│       └── NotFoundView.vue           # 404
├── docs/
│   └── DEVELOPMENT.md      # 开发规范
├── index.html
├── tsconfig.json           # 项目引用根
├── tsconfig.app.json       # 应用编译配置 + 路径别名
├── tsconfig.node.json      # vite.config 等 Node 侧编译
├── vite.config.ts          # Vite 配置(别名、host、端口)
├── package.json
├── bun.lock
├── README.md
└── CHANGELOG.md
```

## 📜 可用脚本

| 命令 | 作用 |
| --- | --- |
| `bun run dev` | 启动 Vite 开发服务器(HMR、监听 0.0.0.0:5173) |
| `bun run build` | `vue-tsc -b` 类型检查 + Vite 构建,产物在 `dist/` |
| `bun run preview` | 本地预览生产产物(0.0.0.0:4173) |
| `bunx vue-tsc -b` | 仅做类型检查(不出产物) |

## 🧭 路由与菜单

路由配置集中在 [`src/router/index.ts`](./src/router/index.ts),菜单数据集中在 [`src/config/menu.ts`](./src/config/menu.ts)。

### 一级菜单(无子项)

```ts
// src/config/menu.ts
{
  key: 'dashboard',
  title: 'menu.dashboard',   // i18n key
  icon: IconDashboard,
  path: '/dashboard',
}
```

### 一级菜单 + 二级子菜单

`MenuItem.children` 字段非空时,自动用 `<a-sub-menu>` 渲染,二级项用 `SubMenuItem` 描述。

```ts
{
  key: 'menu-demo',
  title: 'menu.menuDemo',
  icon: IconMenu,
  path: '/menu-demo',        // 父级路径,用于选中态前缀匹配 / 路由重定向
  children: [
    { key: 'menu1', title: 'menu.menu1', path: '/menu-demo/menu1' },
    { key: 'menu2', title: 'menu.menu2', path: '/menu-demo/menu2' },
    { key: 'menu3', title: 'menu.menu3', path: '/menu-demo/menu3' },
  ],
}
```

路由侧需在 `src/router/index.ts` 注册嵌套:

```ts
{
  path: 'menu-demo',
  name: 'menu-demo',
  redirect: '/menu-demo/menu1',     // 父级直接落子项
  component: () => import('@/views/menu-demo/MenuDemoView.vue'),
  meta: { title: 'menu.menuDemo', requiresAuth: true },
  children: [
    { path: 'menu1', name: 'menu1', component: () => import('@/views/menu-demo/Menu1View.vue'), meta: { title: 'menu.menu1', requiresAuth: true } },
    // ...
  ],
}
```

完整步骤见 [「新增一个业务页面」](#-新增一个业务页面)。

> Arco v2.58 注意事项:`<a-menu>` 的 `openKeys` 受控用法**必须用 `v-model:open-keys`**(即 `v-model:openKeys`)。它不提供 `sub-menu-toggle` 事件;若用单向 `:open-keys` + 自行监听,会导致点击一级菜单标题不展开。详见 [`docs/DEVELOPMENT.md`](./docs/DEVELOPMENT.md#arco-菜单组件)。

## 🛡️ 登录与权限

- `useUserStore` 维护 `token` 和 `userInfo`,均持久化到 `localStorage`(key: `admin-webui:token` / `admin-webui:user`)
- `router.beforeEach` 守卫:
  - `meta.requiresAuth === true` 且没 token → 跳转 `/login?redirect=<原路径>`
  - 已登录访问 `/login` → 跳转 `/dashboard`
- 退出登录:Header 用户下拉 → 「退出登录」(弹二次确认)

> 接入真实后端时,把 `stores/user.ts:login()` 里的 mock 换成实际接口,并在请求拦截器里注入 `Authorization: Bearer ${token}`。

## 🌗 主题切换

Arco 通过 `<body arco-theme="dark">` 属性切换深色。本项目用 `useThemeStore` 封装:

- 首次进入读取 `localStorage`,无值则跟随系统偏好
- Header 右上角太阳/月亮图标切换
- 切换后写回 `localStorage`,刷新依旧生效
- 启动时 `applyInitialTheme()` 在 `app.mount` 前同步贴属性,避免首屏闪烁

## 🎨 自定义品牌色

主色已通过 [`src/styles/theme.css`](./src/styles/theme.css) 覆盖为 `#722ED1`(与登录页 banner 渐变保持一致)。

**换其他品牌色** —— 三步:

1. 打开 [Arco 调色板生成器](https://arco.design/themes/palette)
2. 输入主色 hex,拷贝生成的 10 阶
3. 编辑 `theme.css`,把 `--primary-1` ~ `--primary-10` 的 RGB 三元组替换(注意是 **空格分隔的 R G B**,Arco 内部用 `rgb(var(--primary-6))` 引用)

```css
html body {
  --primary-6: 114 46 209;  /* 主色 */
  /* ...其余 9 阶 */
}
html body[arco-theme='dark'] {
  --primary-6: 141 88 222;  /* 深色模式的主色(通常稍亮) */
  /* ...其余 9 阶 */
}
```

> 也可同样覆盖 `--success-*` / `--warning-*` / `--danger-*` / `--link-*` 等系列变量。

## 📦 按需加载

Arco 通过 [`unplugin-vue-components`](https://github.com/unplugin/unplugin-vue-components) + `ArcoResolver` **按需引入** —— 模板里照常写 `<a-button>` / `<icon-user>`,编译时自动生成对应 `import` + 样式,未使用的组件完全不进 bundle。

**已配置**:[`vite.config.ts`](./vite.config.ts)

```ts
Components({
  dts: 'src/components.d.ts',
  resolvers: [ArcoResolver({ sideEffect: true })],
})
```

**命令式 API**(`Message` / `Modal` / `Notification`)在模板里不出现,resolver 检测不到,因此 [`src/main.ts`](./src/main.ts) 手动 import 一次它们的样式:

```ts
import '@arco-design/web-vue/es/message/style/css.js'
import '@arco-design/web-vue/es/notification/style/css.js'
```

如要新增 `ImagePreview` 等同类命令式 API,**记得补一行样式 import**。

体积对比(本项目 build 实测):

| 模式 | JS 总量 | CSS 总量 | 首屏(/login) gzip |
| --- | --- | --- | --- |
| 全量引入 | ~1.4 MB | ~700 KB | ~280 KB |
| **按需引入** | **636 KB** | **268 KB** | **~35 KB** |

## 🌍 国际化

内置 **简体中文** / **English** / **العربية** / **日本語** 四语,通过 [`vue-i18n`](https://vue-i18n.intlify.dev) 实现。

**启动时的语言决定顺序**(见 [`src/i18n/index.ts`](./src/i18n/index.ts)):

1. `localStorage['admin-webui:locale']` —— 用户上次手动选择
2. `navigator.language` / `navigator.languages` —— 浏览器语言
   - `zh*` → 中文
   - `en*` → 英文
   - `ar*` → العربية
   - `ja*` → 日本語
3. 都匹配不上 → **默认中文**

**切换方式**:Header 右上角地球图标 → 选择语言,会:

- 更新 `vue-i18n` 当前语言
- 写入 `localStorage`
- 同步 `<html lang>` 属性
- 同步 Arco `ConfigProvider` 的 locale(分页、日期组件等内部文案跟着切)
- 重算面包屑与 `document.title`
- 阿拉伯语切换时 `<html dir="rtl">` 同步翻转(由 arco 内置 `ConfigProvider` 处理)

**新增 / 修改文案** —— 同时改四份文件:

```
src/i18n/locales/zh-CN.ts
src/i18n/locales/en-US.ts
src/i18n/locales/ar-SA.ts
src/i18n/locales/ja-JP.ts
```

模板里用 `useI18n().t()`,带占位符用 `t('xxx', { name })`:

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <h1>{{ t('dashboard.stats.revenue') }}</h1>
</template>
```

> 路由 `meta.title` 与菜单 `title` 字段均存放 i18n key(如 `menu.dashboard`),渲染时再 `t()` 解析,确保切换语言时面包屑 / 标题立即更新。

## 🌐 局域网访问

`vite.config.ts` 已设置 `server.host: '0.0.0.0'`,默认端口被占用时自动让位(`strictPort: false`)。

注意事项:

- **macOS 防火墙**:首次启动会弹窗,选择「允许」
- **公网访问**:`0.0.0.0` 只解决本机绑定,跨网络访问需 ngrok / cloudflared / 内网穿透 / 路由器端口映射
- **临时启用**:也可不改配置,用 `bun run dev -- --host` 单次覆盖

## ➕ 新增一个业务页面

### A. 一级菜单

1. **创建视图**:`src/views/<模块>/<Xxx>View.vue`(以 `View` 结尾)
2. **注册路由**:`src/router/index.ts` 的 `AdminLayout.children` 中加一条
3. **添加菜单**:`src/config/menu.ts` 的 `menuItems` 中加一项
4. **补 i18n**:`src/i18n/locales/*.ts` 的 `menu` 段加 key

### B. 带二级子菜单

1. **创建视图目录**:`src/views/<模块>/`
   - 父级占位页:`<模块>View.vue`(可空,父路由会 `redirect`)
   - 子项:`<模块>Sub<序号>View.vue`
   - 共享小组件(如需):放在同目录的 `components/` 或平铺
2. **注册嵌套路由**:`src/router/index.ts` 加 `path: '<模块>'` 父路由,`children` 注册每个子项
3. **菜单配置**:`src/config/menu.ts` 的对应项加 `children: SubMenuItem[]`
4. **补 i18n**:`src/i18n/locales/*.ts` 的 `menu` 段加父 + 子 key,以及子页的命名空间文案

### C. 不进菜单的页面(如详情页)

路由 `meta` 加 `hideInMenu: true`(留作未来扩展);目前菜单组件不读 meta,只读 `menu.ts`,只要不加进 `menuItems` 就不显示。

### D. 可选:加 Pinia store

若该模块有独立的全局状态(跨组件共享),建一个 `src/stores/<模块>.ts`;只在单页用的状态留在组件 `ref` 即可。

完整规范见 [`docs/DEVELOPMENT.md`](./docs/DEVELOPMENT.md)。

## 🔌 接入真实后端

1. 安装请求库:`bun add axios` 或 `bun add ofetch`
2. 新建 `src/api/request.ts` 封装实例,统一注入 token 和错误处理
3. 按业务划分 `src/api/<模块>.ts`
4. 在视图里替换 mock 数据为 API 调用

示例骨架可参考 [`docs/DEVELOPMENT.md`](./docs/DEVELOPMENT.md#网络请求约定)。

## 🧩 已实现的示例页

| 路由 | 说明 | 主要组件 |
| --- | --- | --- |
| `/dashboard` | 控制台 | Statistic、Chart、Table |
| `/example` | 用户管理 CRUD | Form、Table、Modal、Message |
| `/image` | Image 组件全用法 | Image、Image.PreviewGroup |
| `/upload` | Upload 组件全用法 | Upload(基础/拖拽/照片墙/限制/手动) |
| `/menu-demo/menu1` | 二级菜单 1:计数器 | Button、Card |
| `/menu-demo/menu2` | 二级菜单 2:信息架构 | Tabs、Descriptions、Collapse |
| `/menu-demo/menu3` | 二级菜单 3:迷你记事本 | Form、Table、Modal |

## 🐞 常见问题

**Q: 端口 5173 被占用?**
A: `strictPort: false` 会自动换到 5174 等,看启动日志的 `Local:` 行即可。强制用 5173 把 `strictPort` 改成 `true`,然后 `lsof -i :5173` 杀掉占用进程。

**Q: 深色模式不生效?**
A: 检查 `<body>` 是否带 `arco-theme="dark"` 属性。重置:在浏览器 DevTools 控制台执行 `localStorage.removeItem('admin-webui:theme')` 再刷新。

**Q: TypeScript 报路径 `@/...` 找不到?**
A: 同时修改了 `vite.config.ts` 和 `tsconfig.app.json` 才能生效;改完重启 IDE 的 TypeScript Server。

**Q: 一级菜单点击不展开 / 二级菜单点不出来?**
A: `<a-menu>` 必须用 `v-model:open-keys`,不能只写 `:open-keys`。arco v2.58 **没有** `sub-menu-toggle` 事件。受控用法见 [「路由与菜单」](#-路由与菜单) 末段。

**Q: 想做按需引入减小体积?**
A: 改用 `unplugin-vue-components` 自动按需 + `@arco-design/web-vue/es/<component>/style/index.js` 单独引入样式,可参考 Arco 官方文档。当前为了开发便捷使用全量引入。

## 📄 License

私有项目,默认无开源协议。如要开源请补 `LICENSE`。

---

> 详细开发规范请阅读 [`docs/DEVELOPMENT.md`](./docs/DEVELOPMENT.md)
> 版本变更记录请阅读 [`CHANGELOG.md`](./CHANGELOG.md)
