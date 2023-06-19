import React from 'react'
import Image from 'next/image'

interface Props {
  onClick?: () => void
  name?: string
}

const Icon: React.FC<Props> = ({ onClick, name }) => {
  return (
    <div className='chatIcon' onClick={() => onClick}>
      <Image src={`/chat/siderbar/${name}_fill.svg`} width={30} alt='qqappicon' height={30} />
    </div>
  )
}

export default Icon
