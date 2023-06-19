import React from 'react'
import { motion } from 'framer-motion'
interface Props {
  onClick?: () => void
  onSelectEmoji: (emjoy: string) => void
  divRef: React.MutableRefObject<null>
}

const EmojiPanel = ({ onSelectEmoji, divRef }: Props) => {
  return (
    <motion.div
      ref={divRef}
      className={`emjoyPanel`}
      initial={{ opacity: 0.3, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, duration: 1 }}
    >
      <span className='ml-1' onClick={() => onSelectEmoji('😀')}>
        😀
      </span>
      <span onClick={() => onSelectEmoji('😂')}>😂</span>
      <span onClick={() => onSelectEmoji('😍')}>😍</span>
      <span onClick={() => onSelectEmoji('🤔')}>🤔</span>
      <span onClick={() => onSelectEmoji('🤣')}>🤣</span>
      <span onClick={() => onSelectEmoji('🥰')}>🥰</span>
      <span onClick={() => onSelectEmoji('😊')}>😊</span>
      <span onClick={() => onSelectEmoji('😎')}>😎</span>
      <span onClick={() => onSelectEmoji('😜')}>😜</span>
      <span onClick={() => onSelectEmoji('😘')}>😘</span>
      <span onClick={() => onSelectEmoji('😋')}>😋</span>
      <span onClick={() => onSelectEmoji('😇')}>😇</span>
      <span onClick={() => onSelectEmoji('🤩')}>🤩</span>
      <span onClick={() => onSelectEmoji('🤗')}>🤗</span>
      <span onClick={() => onSelectEmoji('🤪')}>🤪</span>
      <span onClick={() => onSelectEmoji('🤫')}>🤫</span>
      <span onClick={() => onSelectEmoji('🤭')}>🤭</span>
      <span onClick={() => onSelectEmoji('🥳')}>🥳</span>
      <span onClick={() => onSelectEmoji('🥺')}>🥺</span>
      <span onClick={() => onSelectEmoji('🤯')}>🤯</span>
      <span onClick={() => onSelectEmoji('🤡')}>🤡</span>
      <span onClick={() => onSelectEmoji('🤠')}>🤠</span>
      <span onClick={() => onSelectEmoji('🤢')}>🤢</span>
      <span onClick={() => onSelectEmoji('🤮')}>🤮</span>
      <span onClick={() => onSelectEmoji('🥴')}>🥴</span>
      <span onClick={() => onSelectEmoji('🥵')}>🥵</span>
      <span onClick={() => onSelectEmoji('🥶')}>🥶</span>
      <span onClick={() => onSelectEmoji('🥷')}>🥷</span>
      <span onClick={() => onSelectEmoji('🦸')}>🦸</span>
      <span onClick={() => onSelectEmoji('🦹')}>🦹</span>
      <span onClick={() => onSelectEmoji('🦷')}>🦷</span>
      <span onClick={() => onSelectEmoji('🦴')}>🦴</span>
      <span onClick={() => onSelectEmoji('🦾')}>🦾</span>
      <span onClick={() => onSelectEmoji('🧠')}>🧠</span>
      <span onClick={() => onSelectEmoji('🧐')}>🧐</span>
      <span onClick={() => onSelectEmoji('🧑')}>🧑</span>
      <span onClick={() => onSelectEmoji('🧒')}>🧒</span>
      <span onClick={() => onSelectEmoji('🧓')}>🧓</span>
      <span onClick={() => onSelectEmoji('🧔')}>🧔</span>
      <span onClick={() => onSelectEmoji('🧕')}>🧕</span>
      <span onClick={() => onSelectEmoji('🧖')}>🧖</span>
      <span onClick={() => onSelectEmoji('🧗')}>🧗</span>
      <span onClick={() => onSelectEmoji('🧘')}>🧘</span>
      <span onClick={() => onSelectEmoji('🧙')}>🧙</span>
      <span onClick={() => onSelectEmoji('🧚')}>🧚</span>
      <span onClick={() => onSelectEmoji('🧛')}>🧛</span>
      <span onClick={() => onSelectEmoji('🧜')}>🧜</span>
      <span onClick={() => onSelectEmoji('🧝')}>🧝</span>
      <span onClick={() => onSelectEmoji('🧞')}>🧞</span>
      <span onClick={() => onSelectEmoji('🧟')}>🧟</span>
      <span onClick={() => onSelectEmoji('🧠')}>🧠</span>
      <span onClick={() => onSelectEmoji('🧡')}>🧡</span>
      <span onClick={() => onSelectEmoji('🧢')}>🧢</span>
      <span onClick={() => onSelectEmoji('🧣')}>🧣</span>
      <span onClick={() => onSelectEmoji('🧤')}>🧤</span>
      <span onClick={() => onSelectEmoji('🧥')}>🧥</span>
      <span onClick={() => onSelectEmoji('🧦')}>🧦</span>
      <span onClick={() => onSelectEmoji('🧧')}>🧧</span>
      <span onClick={() => onSelectEmoji('🧨')}>🧨</span>
      <span onClick={() => onSelectEmoji('🧩')}>🧩</span>
      <span onClick={() => onSelectEmoji('🧪')}>🧪</span>
      <span onClick={() => onSelectEmoji('🧫')}>🧫</span>
      <span onClick={() => onSelectEmoji('🧬')}>🧬</span>
      <span onClick={() => onSelectEmoji('🧭')}>🧭</span>
      <span onClick={() => onSelectEmoji('🧮')}>🧮</span>
      <span onClick={() => onSelectEmoji('🧯')}>🧯</span>
      <span onClick={() => onSelectEmoji('🧰')}>🧰</span>
      <span onClick={() => onSelectEmoji('🧱')}>🧱</span>
      <span onClick={() => onSelectEmoji('🧲')}>🧲</span>
      <span onClick={() => onSelectEmoji('🧳')}>🧳</span>
      <span onClick={() => onSelectEmoji('🧴')}>🧴</span>
      <span onClick={() => onSelectEmoji('🧵')}>🧵</span>
      <span onClick={() => onSelectEmoji('🧶')}>🧶</span>
      <span onClick={() => onSelectEmoji('🧷')}>🧷</span>
      <span onClick={() => onSelectEmoji('🧸')}>🧸</span>
      <span onClick={() => onSelectEmoji('🧹')}>🧹</span>
      <span onClick={() => onSelectEmoji('🧺')}>🧺</span>
      <span onClick={() => onSelectEmoji('🧻')}>🧻</span>
      <span onClick={() => onSelectEmoji('🧼')}>🧼</span>
      <span onClick={() => onSelectEmoji('🧽')}>🧽</span>
      <span onClick={() => onSelectEmoji('🧾')}>🧾</span>
    </motion.div>
  )
}

export default EmojiPanel
