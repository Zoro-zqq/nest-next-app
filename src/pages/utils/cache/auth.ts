import {
  TOKEN_KEY,
  LOCALE_KEY,
  USER_INFO_KEY,
  TIMER_KEY,
  OPEN_WINDOW_KEY,
  CURRENT_COOP_ID
} from '../../settings/cacheEnums'
import { UserInfo } from '../../settings/constants'
interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined
  [LOCALE_KEY]: string | number | null | undefined
  [TIMER_KEY]: string | number | null | undefined
  [OPEN_WINDOW_KEY]: string[] | null | undefined
  [CURRENT_COOP_ID]: string[] | null | undefined
  [USER_INFO_KEY]: UserInfo
}
type BasicKeys = keyof BasicStore
function getKey(key: string) {
  return `${LOCALE_KEY}${key}`.toUpperCase()
}
export function getToken() {
  return getAuthCache(TOKEN_KEY)
}

export function getAuthCache<T>(key: BasicKeys) {
  try {
    const val = localStorage.getItem(getKey(key))
    if (!val) return null
    const data = JSON.parse(val)
    const { value, expire } = data
    if (expire == null || expire >= new Date().getTime()) {
      return value
    }
    localStorage.removeItem(getKey(key))
  } catch (e) {
    return null
  }
}

export function removeAuthCache<T>(key: BasicKeys) {
  try {
    localStorage.removeItem(getKey(key))
  } catch (e) {
    return null
  }
}

export function setAuthCache(key: BasicKeys, value, expire: number | null = null) {
  const stringData = JSON.stringify({
    value,
    time: Date.now(),
    expire: !!expire ? new Date().getTime() + expire * 1000 : null
  })
  localStorage.setItem(getKey(key), stringData)
}

export function clearAuthCache() {
  localStorage.clear()
}
