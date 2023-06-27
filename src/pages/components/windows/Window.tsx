import React, { useEffect, useRef, useState } from 'react'
// import { useDraggable } from '@neodrag/react'
import { useLocalStorageState } from 'ahooks'
import { motion } from 'framer-motion'
import type { AppsData } from '../../settings/config'
import TrafficHeader from './TrafficLight'
import { setMax, setFocus, setMinimizeApps } from '../../store/slice/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import useWindowSize from '../../hooks/useWindowSize'
let useDraggable
import('@neodrag/react').then(res => (useDraggable = res.useDraggable))
interface WindowProps {
  app: AppsData
  children: React.ReactNode
}

const Window = ({ app, children }: WindowProps) => {
  if (!useDraggable) return
  const { winWidth, winHeight } = useWindowSize()
  const { max, focusApp, minimizeApps } = useSelector((state: AppState) => state.app)
  const dispatch = useDispatch()

  const ZINDEX = 99999
  // check if to be phone mode
  const isRotate = winWidth < 767
  const [box, setBox] = useState({
    width: 0,
    height: 0
  })
  const [position, setPosition] = useState({
    x: max ? 0 : (isRotate ? winHeight : winWidth) * (Math.random() * 0.2 + 0.05),
    y: max ? 0 : (isRotate ? winWidth : winHeight) * (Math.random() * 0.2 + 0.05)
  })

  const [lastPositon, setLastPosition] = useLocalStorageState('LAST_POSITION', {
    defaultValue: position
  })
  const minimizeFlag = minimizeApps.includes(app.windowName)

  const handleMax = () => {
    setMax(app.windowName)
    setBox({ width: isRotate ? winHeight : winWidth, height: isRotate ? winWidth : winHeight })
    setLastPosition(position)
    setPosition({ x: 0, y: 0 })
  }
  const handleMini = () => {
    setMax('')
    setBox({
      width: Math.min(winWidth, app.width ? app.width : 540),
      height: Math.min(winHeight, app.height ? app.height : 450)
    })
    setPosition(lastPositon)
  }

  useEffect(() => {
    if (app.windowName !== 'sheet') {
      setBox({
        width: max ? winWidth : Math.min(winWidth, app.width ? app.width : 540),
        height: max ? winHeight : Math.min(winHeight, app.height ? app.height : 450)
      })
    } else {
      handleMax()
    }

    dispatch(
      setFocus({
        windowName: app.windowName
      })
    )
  }, [])

  const draggableRef = useRef(null)

  // init dragable
  const options = {
    position,
    onDrag: ({ offsetX, offsetY }) =>
      setPosition({ x: isRotate ? offsetY : offsetX, y: isRotate ? offsetX : offsetY }),
    bounds: { bottom: -500, top: 32, left: -600, right: -600 },
    handle: '.window-header',
    cancel: '.traffic-lights',
    disabled: !!max
  }
  useDraggable(draggableRef, options)
  return (
    <motion.div
      ref={draggableRef}
      style={{
        position: 'absolute',
        borderRadius: '10px',
        width: `${box.width}px`,
        height: `${box.height}px`,
        zIndex: max ? 1000000 : focusApp === app.windowName ? ZINDEX + 1 : ZINDEX,
        visibility: minimizeFlag ? 'hidden' : 'visible'
      }}
      onClick={() =>
        dispatch(
          setFocus({
            windowName: app.windowName
          })
        )
      }
      // exit={{ opacity: 0.8, scale: 0, x: (winWidth * 5) / 12, y: winHeight, dur: 2000 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <motion.header
        style={{
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          height: `30px`,
          width: '100%',
          zIndex: ZINDEX,
          display: 'flex'
        }}
        className='window-header'
        onDoubleClick={max ? handleMini : handleMax}
        initial={{ opacity: 0.3, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <TrafficHeader
          id={app.windowName}
          handleMax={handleMax}
          handleMini={handleMini}
          handleMinimize={() =>
            dispatch(
              setMinimizeApps({
                windowName: app.windowName,
                type: 'add'
              })
            )
          }
        />
      </motion.header>

      <motion.div
        style={{
          position: 'relative',
          height: `100%`,
          width: '100%'
        }}
        initial={{ opacity: 0.3, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default React.memo(Window)
