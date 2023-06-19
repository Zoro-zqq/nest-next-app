import React from 'react'
import { useMotionValue } from 'framer-motion'
import DockItem from './dockItem'
import { apps } from '../../settings/config'
import styles from './scss/dock.module.scss'

const Dock = () => {
  const mouseX = useMotionValue<number | null>(null)

  return (
    <div className={styles['z-dock']}>
      <ul
        className={styles['z-dock-content']}
        onMouseMove={e => mouseX.set(e.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}
      >
        {apps.map(app => (
          <DockItem key={`dock-${app.windowName}`} app={app} mouseX={mouseX} />
        ))}
      </ul>
    </div>
  )
}

export default Dock
