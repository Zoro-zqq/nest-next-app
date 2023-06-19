import { setAuthCache, getAuthCache, removeAuthCache } from './auth.ts'
import { OPEN_WINDOW_KEY } from '../../settings/cacheEnums.ts'

export default function setStorageWindows({ type = 'open', windowName = 'custom' }) {
  let openWindows = getAuthCache(OPEN_WINDOW_KEY) || []
  if (type === 'open') {
    setAuthCache(OPEN_WINDOW_KEY, openWindows.concat(windowName))
  } else {
    openWindows.splice(
      openWindows.findIndex(name => name === windowName),
      1
    )
    if (openWindows.length === 0) {
      removeAuthCache(OPEN_WINDOW_KEY)
    } else {
      setAuthCache(OPEN_WINDOW_KEY, openWindows)
    }
  }
}
