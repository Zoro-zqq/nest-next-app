import { useEffect, useCallback } from 'react'
import setStorageWindows from '../utils/cache/windows'

export default function useHandleTabClose(windowName: string) {
  let channel
  const handleTabClose = useCallback(() => {
    /*  if ((event.clientX > document.body.clientWidth && event.clientY < 0) || event.altKey) {
      console.log('你关闭了浏览器')
    } else {
      console.log('刷新了浏览器')
    } */
    //无论关闭/刷新页面都先删除 localStorage 里的该windowName, 通知主页标签页更新
    setStorageWindows({
      type: 'close',
      windowName
    })
    channel.postMessage(windowName)
  }, [])

  useEffect(() => {
    //进来该页面就将该页面windowName加入localStorage, 通知主页标签页更新
    channel = new BroadcastChannel(windowName)
    channel.postMessage(windowName)
    setStorageWindows({
      type: 'open',
      windowName: windowName
    })
    window.addEventListener('beforeunload', handleTabClose)

    return () => {
      window.removeEventListener('beforeunload', handleTabClose)
    }
  }, [])
}
