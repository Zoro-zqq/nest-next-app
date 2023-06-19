import React, { useRef, useEffect, useState } from 'react'
import type { MotionValue } from 'framer-motion'
import { motion } from 'framer-motion'
import { AppsData } from '../../settings/config'
import useDockHoverAnimation from '../../hooks/dockItemHook'
import { setOpenApp, setFocus, setMinimizeApps } from '../../store/slice/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import styles from './scss/dock.module.scss'

interface DockItemProps {
  app: AppsData
  mouseX: MotionValue
}

const DockItem = ({ app, mouseX }: DockItemProps) => {
  const { openApps, minimizeApps } = useSelector((state: AppState) => state.app)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const imgRef = useRef<HTMLImageElement>(null)
  const { width } = useDockHoverAnimation(mouseX, imgRef, 50, 2)

  useEffect(() => {
    setIsOpen(openApps.includes(app.windowName))
  }, [openApps])

  const dockItemClick = () => {
    if (app.link) {
      //打开/关闭对应路由标签页（窗口） 通知这边更新 ： 更新setOpenApp
      new BroadcastChannel(app.windowName).onmessage = e => {
        console.log('BroadcastChannel:', e.data)
        dispatch(
          setOpenApp({
            windowName: app.windowName,
            type: 'refresh'
          })
        )
      }
      //打开路由新窗口
      window.open(app.link + '?timestamp=' + Date.now(), app.windowName)
    } else {
      const isMinimize = minimizeApps.includes(app.windowName)
      if (isMinimize) {
        dispatch(
          setMinimizeApps({
            windowName: app.windowName,
            type: 'remove'
          })
        )
        return
      }
      dispatch(
        setOpenApp({
          windowName: app.windowName,
          type: 'open'
        })
      )
    }
  }
  const mouseEnter = (windowName: string) => {
    dispatch(
      setFocus({
        windowName
      })
    )
  }

  return (
    <li
      onMouseEnter={() => {
        mouseEnter(app.windowName)
      }}
      id={`dock-${app.windowName}`}
      onClick={dockItemClick}
      className={styles['z-dock-item']}
    >
      <p className={styles['z-dock-item__title']}>{app.title}</p>
      <motion.img
        className={styles['z-dock-item__image']}
        ref={imgRef}
        src={app.img}
        alt={app.title}
        title={app.title}
        draggable={false}
        style={{ width, willChange: 'width' }}
      />
      <div className={`${styles['z-dock-item__hasOpen']} ${isOpen ? '' : styles['invisible']}`} />
    </li>
  )
}

export default DockItem
