import Image from 'next/image'
import React from 'react'
interface Props {
  onClick?: () => void
  name?: string
  desc?: string
}

const Icon: React.FC<Props> = ({ onClick, name, desc }) => {
  return (
    <div
      style={{
        height: '46px',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        padding: '0 4px'
      }}
      onClick={e => {
        e.preventDefault()
        onClick && onClick()
      }}
      onMouseEnter={e => {
        e.currentTarget.children[0].setAttribute('src', `/chat/chatwindow/${name}_fill.svg`)
        e.currentTarget.children[1].classList.remove('invisible')
      }}
      onMouseLeave={e => {
        e.currentTarget.children[0].setAttribute('src', `/chat/chatwindow/${name}_dark.svg`)
        e.currentTarget.children[1].classList.add('invisible')
      }}
    >
      <Image src={`/chat/chatwindow/${name}_dark.svg`} width={30} alt='chatappicon' height={30} />
      <div
        style={{
          position: 'absolute',
          top: '-12px',
          borderRadius: '4px',
          width: `${desc ? desc.length * 1.1 : 0}rem`
        }}
        className='invisible'
      >
        {desc}
      </div>
    </div>
  )
}

export default Icon
