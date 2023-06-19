import React from 'react'
import Image from 'next/image'

interface Props {
  onClick?: () => void
  name?: string
}

const Icon: React.FC<Props> = ({ onClick, name }) => {
  return (
    <div
      className='chatIcon'
      onClick={() => onClick}
      onMouseEnter={e => {
        e.currentTarget.children[0].setAttribute('src', `/chat/siderbar/${name}_fill.svg`)
      }}
      onMouseLeave={e => {
        e.currentTarget.children[0].setAttribute('src', `/chat/siderbar/${name}_dark.svg`)
      }}
    >
      <Image src={`/chat/siderbar/${name}_dark.svg`} width={30} alt='chatappicon' height={30} />
    </div>
  )
}

export default Icon
