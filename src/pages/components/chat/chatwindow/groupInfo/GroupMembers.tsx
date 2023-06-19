import Image from 'next/image'
import React from 'react'

interface Props {
  activeUsers: any[]
}

const GroupMembers = ({ activeUsers }: Props) => {
  const renderMembers = () => {
    return activeUsers.map(user =>
      user ? (
        <div key={user.id} className='flex items-center'>
          <Image src={user?.avatar || ''} width={30} height={30} alt='user-img' />
          <p>
            {user.username}
            {user.role == '0' && ' 👑'}
          </p>
        </div>
      ) : (
        ''
      )
    )
  }

  return (
    <div className={`flex flex-col flex-1 w-full`} style={{ backgroundColor: '#f2f2f2' }}>
      <header className='flex p-1'>
        <div>成员 {`(${activeUsers.length})`}</div>
        <div className='flex-1'></div>
        <div className='mr-2'></div>
      </header>
      <div
        style={{
          overflowY: 'scroll',
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
          height: '380px'
        }}
        className={` w-full px-2 chatlist`}
        onMouseEnter={e => {
          e.currentTarget.classList.remove('chatlist')
          e.currentTarget.classList.add('chatlist_')
        }}
        onMouseLeave={e => {
          e.currentTarget.classList.remove('chatlist_')
          e.currentTarget.classList.add('chatlist')
        }}
      >
        {renderMembers()}
      </div>
    </div>
  )
}

export default GroupMembers
