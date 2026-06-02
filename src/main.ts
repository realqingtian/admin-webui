import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Message, Modal, Notification } from '@arco-design/web-vue'

import App from './App.vue'
import router from './router'
import i18n, { applyInitialHtmlLang } from './i18n'
import { applyInitialTheme } from './stores/theme'

import './style.css'
import './styles/theme.css'

// 命令式 API(Message / Modal / Notification)在模板里不出现,
// resolver 不会自动带入它们的样式,这里显式 import 一次即可。
import '@arco-design/web-vue/es/message/style/css.js'
import '@arco-design/web-vue/es/notification/style/css.js'
import '@arco-design/web-vue/es/modal/style/css.js'

// 在挂载前同步贴上 dark / lang,避免首屏闪烁
applyInitialTheme()
applyInitialHtmlLang()

// Arco 组件由 unplugin-vue-components 按需加载,
// 模板里直接 <a-button> / <icon-user> 即可,无需全量 use(ArcoVue).

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)

// 安装命令式 API,让 $modal / $message / $notification 可用,
// 同时把 app 上下文挂到 Modal/Message/Notification 上 ——
// 这样从 setup 里直接 `import { Modal }` 调用 Modal.confirm 时
// 也能拿到 i18n / pinia / router 等 inject,modal 才能正常弹出。
app.use(Message)
app.use(Modal)
app.use(Notification)
Message._context = app._context
Modal._context = app._context
Notification._context = app._context

app.mount('#app')
