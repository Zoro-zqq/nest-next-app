import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useAppDispatch, AppState } from '../../store/store.ts'
import { logout } from '../../store/slice/authSlice.ts'
import styles from './scss/index.module.scss'
import { message } from 'antd'
import router from 'next/router'

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
}

export default function Avatar(props: { backgroundColor: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const { userInfo } = useSelector((state: AppState) => state.auth)
  const dispatch = useAppDispatch()
  const toLogout = async () => {
    try {
      await dispatch(logout())
      messageApi.open({
        type: 'success',
        content: '退出登录成功！'
      })
      setTimeout(() => {
        router.push('/pc/login')
      }, 1000)
    } catch (e) {
      console.error(e)
      messageApi.error(e)
    }
  }
  return (
    <>
      {contextHolder}
      <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'} className={styles['menu']}>
        <motion.button
          animate={{ backgroundColor: props.backgroundColor }}
          className={styles['button']}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles['span']}>
            {userInfo && userInfo.name
              ? userInfo.name.length > 3
                ? userInfo.name.substr(0, 3) + '...'
                : userInfo.name
              : '已退出'}
          </span>
          <motion.div
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 }
            }}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.55 }}
          >
            <svg width='15' height='15' viewBox='0 0 20 20'>
              <path
                style={{ fill: props.backgroundColor, transitionDuration: '0.2s' }}
                d='M0 7 L 20 7 L 10 16'
              />
            </svg>
          </motion.div>
        </motion.button>
        <motion.ul
          className={styles['ul']}
          variants={{
            open: {
              clipPath: 'inset(0% 0% 0% 0% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05
              }
            },
            closed: {
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.3
              }
            }
          }}
          style={{
            pointerEvents: isOpen ? 'auto' : 'none',
            backgroundColor: props.backgroundColor
          }}
        >
          <motion.li variants={itemVariants} onClick={toLogout}>
            退出登录
          </motion.li>
        </motion.ul>
      </motion.nav>
    </>
  )
}
