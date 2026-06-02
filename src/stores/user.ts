/**
 * 用户/登录态:模拟 token,持久化到 localStorage
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

const TOKEN_KEY = 'admin-webui:token'
const USER_KEY = 'admin-webui:user'

interface UserInfo {
  name: string
  avatar?: string
  role: string
}

function readUser(): UserInfo | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as UserInfo
  } catch {
    return null
  }
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem(TOKEN_KEY) ?? '')
  const userInfo = ref<UserInfo | null>(readUser())

  async function login(username: string, _password: string) {
    // 真实项目接 API,这里给一个模拟 token
    await new Promise((r) => setTimeout(r, 400))
    const fakeToken = `mock-${Date.now()}`
    const info: UserInfo = {
      name: username || '管理员',
      role: 'admin',
    }
    token.value = fakeToken
    userInfo.value = info
    localStorage.setItem(TOKEN_KEY, fakeToken)
    localStorage.setItem(USER_KEY, JSON.stringify(info))
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return { token, userInfo, login, logout }
})
