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

### Changed
- 移除 `main.ts` 里的 `app.use(ArcoVue)` / `app.use(ArcoVueIcon)` 全量引入
- 命令式 API(Message / Notification)样式改为按需 import 单文件
- NotFoundView 改用 Arco 内置 404 插画并放大到 280px

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
