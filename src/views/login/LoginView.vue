<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/stores/user'
import LanguageSwitch from '@/components/LanguageSwitch.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  username: 'admin',
  password: 'admin123',
  remember: true,
})

const rules = computed(() => ({
  username: [{ required: true, message: t('login.form.usernameRequired') }],
  password: [{ required: true, message: t('login.form.passwordRequired') }],
}))

const loading = ref(false)

async function handleSubmit({ errors }: { errors?: Record<string, unknown> }) {
  if (errors) return
  loading.value = true
  try {
    await userStore.login(form.username, form.password)
    Message.success(t('login.success'))
    const redirect = (route.query.redirect as string) || '/dashboard'
    await router.replace(redirect)
  } catch {
    Message.error(t('login.fail'))
  } finally {
    loading.value = false
  }
}

const year = new Date().getFullYear()
</script>

<template>
  <div class="login-container">
    <!-- 左侧 banner -->
    <section class="login-banner">
      <div class="banner-content">
        <div class="banner-illu">
          <!-- 简易插画:三个圆形 + 一个图标,纯 CSS 实现避免引入图片 -->
          <div class="illu-circle illu-circle-1" />
          <div class="illu-circle illu-circle-2" />
          <div class="illu-circle illu-circle-3" />
          <div class="illu-icon">
            <icon-thunderbolt :size="64" />
          </div>
        </div>
        <h1 class="banner-title">{{ t('login.brand.title') }}</h1>
        <p class="banner-desc">{{ t('login.brand.desc') }}</p>
      </div>
    </section>

    <!-- 右侧表单区 -->
    <section class="login-pane">
      <!-- 顶部:logo 在左,语言/主题在右 -->
      <header class="login-pane-header">
        <div class="logo">
          <icon-thunderbolt :size="22" :style="{ color: 'rgb(var(--primary-6))' }" />
          <span>Admin WebUI</span>
        </div>
        <div class="actions">
          <LanguageSwitch />
          <ThemeSwitch />
        </div>
      </header>

      <!-- 中部:表单 -->
      <main class="login-pane-main">
        <div class="form-wrapper">
          <div class="form-title">
            <h2>{{ t('login.title') }}</h2>
            <p>{{ t('login.subtitle') }}</p>
          </div>

          <a-form
            :model="form"
            :rules="rules"
            layout="vertical"
            @submit="handleSubmit"
          >
            <a-form-item
              field="username"
              :label="t('login.form.username')"
              hide-asterisk
            >
              <a-input
                v-model="form.username"
                :placeholder="t('login.form.usernamePlaceholder')"
                size="large"
                allow-clear
              >
                <template #prefix><icon-user /></template>
              </a-input>
            </a-form-item>
            <a-form-item
              field="password"
              :label="t('login.form.password')"
              hide-asterisk
            >
              <a-input-password
                v-model="form.password"
                :placeholder="t('login.form.passwordPlaceholder')"
                size="large"
                allow-clear
              >
                <template #prefix><icon-lock /></template>
              </a-input-password>
            </a-form-item>

            <div class="form-extra">
              <a-checkbox v-model="form.remember">
                {{ t('login.form.remember') }}
              </a-checkbox>
              <a-link>{{ t('login.form.forgot') }}</a-link>
            </div>

            <a-button
              html-type="submit"
              type="primary"
              size="large"
              long
              :loading="loading"
            >
              {{ t('login.form.submit') }}
            </a-button>

            <p class="form-tips">{{ t('login.tips') }}</p>
          </a-form>
        </div>
      </main>

      <!-- 底部 footer -->
      <footer class="login-pane-footer">
        Copyright © {{ year }} Admin WebUI · Built with Arco Design Vue
      </footer>
    </section>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
  background: var(--color-bg-1);
}

/* ===== 左侧 Banner ===== */
.login-banner {
  display: none;
  flex: 1;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #4080ff 0%, #722ed1 100%);
  color: #fff;
}
.banner-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px;
}
.banner-title {
  margin: 32px 0 16px;
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 1px;
}
.banner-desc {
  margin: 0;
  font-size: 16px;
  opacity: 0.85;
  max-width: 360px;
  line-height: 1.7;
}

/* 纯 CSS 插画 —— 几个错位圆 + 中间图标 */
.banner-illu {
  position: relative;
  width: 220px;
  height: 220px;
}
.illu-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
}
.illu-circle-1 {
  width: 220px;
  height: 220px;
  top: 0;
  left: 0;
}
.illu-circle-2 {
  width: 150px;
  height: 150px;
  top: 35px;
  left: 35px;
  background: rgba(255, 255, 255, 0.22);
}
.illu-circle-3 {
  width: 80px;
  height: 80px;
  top: 70px;
  left: 70px;
  background: rgba(255, 255, 255, 0.32);
}
.illu-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

/* ===== 右侧表单区 ===== */
.login-pane {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--color-bg-1);
}
.login-pane-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 24px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-1);
}
.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.login-pane-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.form-wrapper {
  width: 100%;
  max-width: 360px;
}
.form-title {
  margin-bottom: 32px;
}
.form-title h2 {
  margin: 0 0 8px;
  font-size: 24px;
  color: var(--color-text-1);
}
.form-title p {
  margin: 0;
  color: var(--color-text-3);
  font-size: 14px;
}
.form-extra {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.form-tips {
  margin-top: 16px;
  font-size: 12px;
  color: var(--color-text-3);
  text-align: center;
}

.login-pane-footer {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--color-text-3);
  border-top: 1px solid var(--color-border);
}

/* 桌面端展示 banner —— banner 固定 480px,表单区占满剩余 */
@media (min-width: 992px) {
  .login-banner {
    display: block;
    flex: 0 0 480px;
  }
  .login-pane {
    flex: 1;
    width: auto;
  }
}
</style>
