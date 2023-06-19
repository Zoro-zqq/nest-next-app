import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import GroupAnnouncement from './groupInfo/GroupAnnouncement'
import GroupMembers from './groupInfo/GroupMembers'
import Icon from './icon/Icon'
import { useSelector } from 'react-redux'
import { AppState } from '../../../store/store'
import { useClickAway } from 'ahooks'

const ChatHeader = () => {
  const { activeUsers } = useSelector((state: AppState) => state.chat)
  const divRef = useRef(null)
  const [isShow, setIsShow] = useState(false)

  const handleIconClick = () => {
    setIsShow(state => !state)
  }
  return (
    <>
      <div
        style={{
          height: '24px'
        }}
      ></div>
      <motion.header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            fontSize: '16px',
            color: '#000',
            marginLeft: '16px'
          }}
          onClick={handleIconClick}
        >
          房间人数{` (${activeUsers.length})`}
        </div>
        <div
          style={{
            flex: '1'
          }}
        ></div>
        <div
          style={{
            display: 'flex',
            position: 'relative',
            marginRight: '8px',
            padding: '8px'
          }}
        >
          <div>
            <Icon name='more' onClick={handleIconClick} />
          </div>
          {isShow ? (
            <motion.div
              style={{
                display: 'flex',
                position: 'absolute',
                top: '40px',
                left: '-144px',
                width: '177px',
                flexDirection: 'column'
              }}
              initial={{ opacity: isShow ? 0 : 1 }}
              animate={{ opacity: isShow ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsShow(false)}
              ref={divRef}
            >
              <GroupAnnouncement />
              <GroupMembers activeUsers={activeUsers} />
            </motion.div>
          ) : (
            ''
          )}
        </div>
      </motion.header>
    </>
  )
}

export default ChatHeader
