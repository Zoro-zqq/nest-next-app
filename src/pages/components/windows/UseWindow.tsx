'use client'
import { Suspense, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import Window from './Window'
import { apps } from '../../settings/config'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/store'

export default function Desktop() {
  const { openApps } = useSelector((state: AppState) => state.app)
  const showApps = useMemo(() => {
    return apps.filter(app => app.content && openApps.includes(app.windowName))
  }, [openApps])

  const renderAppWindows = () => {
    return showApps.map(appInfo => {
      return (
        <Window key={appInfo.windowName} app={appInfo}>
          {appInfo.content}
        </Window>
      )
    })
  }

  return (
    <>
      <Suspense fallback={<div>loading</div>}>
        <AnimatePresence>{renderAppWindows()}</AnimatePresence>
      </Suspense>
    </>
  )
}
