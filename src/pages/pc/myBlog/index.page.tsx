import React, { useEffect } from 'react'
import useHandleTabClose from '../../hooks/handleTabClose.hook'
import { BLOG_URL } from '../../../shared/constants/env'

const WINDOWS_NAME = 'blog'

function MyBlog() {
  useHandleTabClose(WINDOWS_NAME)
  useEffect(() => {
    document.title = '我的博客'
  }, [])
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <iframe className='w-full h-full' src={BLOG_URL} title='我的博客' />
    </div>
  )
}

export default MyBlog
