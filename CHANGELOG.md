# Changelog

本项目所有重要变更都会记录在本文件中。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/),版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### Added
- 按需加载:`unplugin-vue-components` + `ArcoResolver`,Arco 组件按使用情况自动 import
- 自定义品牌主题:[`src/styles/theme.css`](src/styles/theme.css) 覆盖 Arco `--primary-*` CSS 变量,默认主色调整为 `#722ED1`,与登录页 banner 渐变一致
- Header 通知中心:`<NotificationDropdown />` 点击展开,6 条 mock 通知 + 分类 tab + 标记已读 / 全部已读 / 清空,完整国际化
- 国际化:`vue-i18n` 中文 / 英文双语,首次启动按浏览器语言识别,fallback 中文
- Header 增加语言切换下拉,同步 Arco `ConfigProvider` locale
- 路由 `meta.title` 与菜单 `title` 改为 i18n key,切换语言面包屑 / 标题立即更新
- 项目文档:完整 `README.md` 与开发规范 `docs/DEVELOPMENT.md`
- 新增 `.editorconfig` 保证跨编辑器一致
- 新增 `CHANGELOG.md`
- **图片组件示例页** [`src/views/image/ImageView.vue`](src/views/image/ImageView.vue):演示 `a-image` 的基础用法、填充模式(fit)、标题与描述、多图预览(`a-image-preview-group`)、加载与错误状态
- **上传组件示例页** [`src/views/upload/UploadView.vue`](src/views/upload/UploadView.vue):演示 `a-upload` 的基础 / 拖拽 / 照片墙 / 限制条件 / 手动上传
- **新增阿拉伯语(ar-SA)与日语(ja-JP)语言包** [`src/i18n/locales/ar-SA.ts`](src/i18n/locales/ar-SA.ts) / [`src/i18n/locales/ja-JP.ts`](src/i18n/locales/ja-JP.ts):Header 语言下拉四语切换;阿拉伯语自动 RTL 翻转由 Arco `ConfigProvider` 处理
- **二级菜单示例** [`src/views/menu-demo/`](src/views/menu-demo/):
  - 一级菜单 `菜单示例` 下挂 3 个子项 `菜单 1/2/3`
  - `Menu1View.vue` 计数器 + 特性清单
  - `Menu2View.vue` Tabs + 描述列表 + Collapse
  - `Menu3View.vue` 可增删 / 勾选 / 表单校验的迷你记事本
  - `MenuDemoNav.vue` 页面切换演示条(顶部三色按钮 + 当前页高亮,直观看到页面切换)
  - `MenuDemoView.vue` 父级占位(默认 `redirect` 到 menu1)
- **多级侧栏**:`src/config/menu.ts` 新增 `SubMenuItem` 类型,`MenuItem.children` 自动用 `<a-sub-menu>` 渲染;`AppSidebar` 选中态 / 展开态完整支持一级 + 二级
- 开发规范 [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) 增补「Arco 菜单组件(踩坑必读)」「二级菜单配置」「国际化约定」「Arco 组件 demo 页规范」章节

### Changed
- 移除 `main.ts` 里的 `app.use(ArcoVue)` / `app.use(ArcoVueIcon)` 全量引入
- 命令式 API(Message / Notification)样式改为按需 import 单文件
- NotFoundView 改用 Arco 内置 404 插画并放大到 280px
- `src/config/menu.ts` 改用 `MenuItem + SubMenuItem` 结构描述侧栏菜单(支持二级)
- `src/layouts/AppSidebar.vue` 重写为 `v-model:open-keys` 双向绑定(arco v2.58 的正确用法)

### Fixed
- 修复 `<a-menu>` 单向 `:open-keys` + 不存在的 `sub-menu-toggle` 事件导致的二级菜单点击不展开 / 点击无反应
- 修复 `handleMenuClick` 不识别二级菜单 key(`menu1/menu2/menu3`)的 bug,导致子项点击后不跳转

### Performance
- Build 体积:JS 总量 ~636 KB / CSS 总量 ~268 KB(全量约 ~2.1 MB),首屏(/login)gzip ~35 KB

## [0.1.0] - 2026-06-02

### Added
- 初始化基于 Vue 3 + Vite 8 + TypeScript 6 的工程骨架
- 接入 Arco Design Vue 2.58 作为 UI 组件库
- 路径别名 `@/` → `src/`
- Pinia 状态管理:`user` / `theme` / `sidebar`,localStorage 持久化
- Vue Router 4:登录守卫(未登录跳 `/login`,已登录访问 `/login` 跳控制台)
- 登录页(`/login`):左品牌右表单,模拟登录
- Arco Pro 风格管理布局:可折叠 Sider + 面包屑 Header + Content + Footer
- 控制台页(`/dashboard`):统计卡 + 销售柱状图 + 最近订单
- 示例功能页(`/example`):用户管理 CRUD(筛选 + 表格 + 增删改 Modal)
- 404 页面
- Vite `server.host: 0.0.0.0`,允许局域网访问
- 深色模式切换(`body[arco-theme=dark]`,跟随系统偏好)

### Notes
- 所有数据均为本地 mock,后端接入待补
- 暂未引入 ESLint / Prettier / 测试框架,按需追加

[Unreleased]: https://example.com/compare/v0.1.0...HEAD
[0.1.0]: https://example.com/releases/tag/v0.1.0
