import React from 'react'
import Image from 'next/image'

const Search = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '44px',
        display: 'flex',
        padding: '8px 16px',
        borderRadius: '8px'
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          backgroundColor: '#f5f5f5',
          padding: '0 4px'
        }}
      >
        <div
          style={{
            width: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image src='/chat/chatlist/search.svg' width={15} alt='chatavatar' height={15} />
        </div>

        <div
          style={{
            flex: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <input
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              width: '100%'
            }}
            className='chatInput'
            type='text'
            placeholder='Search'
          />
        </div>
        <div
          style={{
            width: '12px',
            backgroundColor: '#fff'
          }}
        />
        <div
          style={{
            width: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image src='/chat/chatlist/add.svg' width={15} alt='chatavatar' height={15} />
        </div>
      </div>
    </div>
  )
}

export default Search
