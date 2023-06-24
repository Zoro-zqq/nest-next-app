import { useEffect } from 'react'
import setStorageWindows from '../utils/cache/windows'

export default function useHandleTabClose(windowName: string) {
  let channel
  const handleTabClose = e => {
    /*  if ((event.clientX > document.body.clientWidth && event.clientY < 0) || event.altKey) {
      console.log('你关闭了浏览器')
    } else {
      console.log('刷新了浏览器')
    } */
    //无论关闭/刷新页面都先删除 localStorage 里的该windowName, 通知主页标签页更新
    // Cancel the event
    setStorageWindows({
      type: 'close',
      windowName
    })
    channel.postMessage(windowName)
  }
  useEffect(() => {
    //进来该页面就将该页面windowName加入localStorage, 通知主页标签页更新
    if (!channel) {
      setStorageWindows({
        type: 'open',
        windowName: windowName
      })
      channel = new BroadcastChannel(windowName)
      channel.postMessage(windowName)
      console.log('打开标签页！！！', channel)
      window.onbeforeunload = handleTabClose
    }
    return () => {
      window.onbeforeunload = null
    }
  }, [])
}
