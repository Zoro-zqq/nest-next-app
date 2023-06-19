import { GetServerSideProps } from 'next'
import authGuard from '../utils/authGuard'
import Dock from '../components/dock/dock'
import { useEffect, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { AppState } from '../store/store'
import { colorDict, titleDict } from '../settings/config'
import Avatar from '../components/avatar/Avatar'
import WordCloud from '../components/cloud/wordCloud'
import { useSpring } from '@react-spring/core'
import Scene from '../components/ball'
import dynamic from 'next/dynamic'

const Desktop = dynamic(() =>
  import('../components/windows/UseWindow.tsx').then(mod => mod.default)
)

const PcIndex: React.FC & {
  getInitialProps: GetServerSideProps
} = () => {
  const [rotate, setRotate] = useState(0)
  const [scale, setScale] = useState(0)
  const [boxText, setBoxText] = useState('点击下方选项栏图标打开对应功能页面')
  const [backgroundColor, setBackgroundColor] = useState('#E7DAC5')
  const [background, setBackground] = useState('linear-gradient(to right, #c850c0, #E7DAC5)')
  const { focusApp } = useSelector((state: AppState) => state.app)
  const [toggle, setToggle] = useState(0)
  // We use this spring to interpolate all the colors, position and rotations
  const [{ x }] = useSpring(
    { x: toggle, config: { mass: 5, tension: 1000, friction: 50, precision: 0.0001 } },
    [toggle]
  )
  useEffect(() => {
    setTimeout(() => {
      setScale(1)
      setRotate(45)
    })
  }, [])
  useEffect(() => {
    setBackgroundColor(colorDict[focusApp])
    setBoxText(titleDict[focusApp] || '点击下方选项栏图标打开对应功能页面')
    setRotate(v => {
      if (v === 360) {
        return 45
      }
      return v + 45
    })
    setBackground(`linear-gradient(to right, #c850c0, ${colorDict[focusApp]})`)
  }, [focusApp])
  return (
    <motion.div
      className={`${styles['z-home']}`}
      transition={{ type: 'spring' }}
      animate={{ backgroundColor: toggle === 0 ? '#fff' : '#000' }}
    >
      {/* 左边圆角多边形 */}
      <div>
        <motion.div
          className={`${styles['z-home__box']}`}
          animate={{ rotate, backgroundColor, scale }}
          transition={{ type: 'spring' }}
        ></motion.div>
      </div>
      {/* 多边形里面文本 */}
      <motion.h1 className={`${styles['z-home__title']}`}>{boxText}</motion.h1>
      {/* 左边小球切换 */}
      <div
        style={{
          width: '50vw',
          height: '50vh',
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          transform: 'scale(0.8)',
          zIndex: 999
        }}
      >
        <Scene x={x} set={setToggle} />
      </div>
      {/* 背景颜色提示 */}
      <p
        style={{
          left: '12%',
          bottom: '10%',
          color: '#fff',
          width: '50px',
          transform: 'translate3d(-48%, -62%, 0) rotate3d(1, 0, 0, 55deg) rotate3d(0, 0, 1, 48deg)'
        }}
        className={`${styles['z-home__tips']}`}
      >
        亮
      </p>
      <p
        style={{ left: '18%', bottom: '5%', color: '#000', width: '50px' }}
        className={`${styles['z-home__tips']}`}
      >
        暗
      </p>
      {/* 小球提示 */}
      <motion.h1
        animate={{ color: toggle === 0 ? '#000' : '#fff' }}
        transition={{ type: 'spring' }}
        className={`${styles['z-home__tips']}`}
      >
        点击下方小球可以切换对应背景颜色
      </motion.h1>

      {/* 右边部分 */}
      {/* 右边固定头像 */}
      <Suspense fallback={<></>}>
        <div className={`${styles['z-home__avater']}`}>
          <Avatar backgroundColor={backgroundColor} />
        </div>
      </Suspense>
      {/* 底部固定任务栏 */}
      <Suspense fallback={<></>}>
        <Dock />
      </Suspense>
      {/* 提示点击词云 */}
      <motion.div
        className={`${styles['z-home__row']}`}
        animate={{ backgroundImage: background }}
        transition={{ type: 'spring' }}
      >
        点击下方词云可以快速跳转至对应页面
      </motion.div>
      {/* 词云 */}
      <div
        style={{
          width: '66vw',
          height: '54vh',
          position: 'absolute',
          bottom: '20%',
          right: '-40px',
          zIndex: 999
        }}
      >
        <WordCloud />
      </div>
      {/* 右下角文本 */}
      <motion.div
        className={`${styles['z-home__row']} ${styles['z-home__technology']}`}
        animate={{ backgroundImage: background }}
        transition={{ type: 'spring' }}
      >
        Next Nest <br />
        React Three
      </motion.div>

      {/* 彈窗 */}
      <Suspense fallback={<></>}>
        <Desktop />
      </Suspense>
    </motion.div>
  )
}

export default PcIndex

//路由守卫
PcIndex.getInitialProps = authGuard()
