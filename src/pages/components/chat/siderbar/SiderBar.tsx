import React from 'react'
import Image from 'next/image'
import TopIcon from './TopIcon'
import BottomIcon from './BottomIcon'

const SideBar = () => {
  return (
    <aside
      style={{
        height: '100%',
        width: '66px',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        backgroundColor: '#e4e4e5'
      }}
    >
      <div
        style={{
          height: '24px',
          width: '100%'
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '16px 0'
        }}
      >
        <Image src='/chat/logo/qq_gray.svg' width={35} alt='qqavatar' height={35} />
      </div>
      <div
        style={{
          height: '160px',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '4px'
        }}
      >
        <TopIcon name='chat' />
      </div>
      <div style={{ width: '100%', flex: '1' }}></div>
      <div
        style={{
          height: '160px',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '8px',
          padding: '3px',
          marginBottom: '3px'
        }}
      >
        <BottomIcon name='email' />
        <BottomIcon name='collect' />
        <BottomIcon name='menu' />
      </div>
    </aside>
  )
}

export default SideBar
