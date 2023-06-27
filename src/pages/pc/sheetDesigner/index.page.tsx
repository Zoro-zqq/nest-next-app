import React, { useEffect } from 'react'
import useHandleTabClose from '../../hooks/handleTabClose.hook'

const WINDOWS_NAME = 'sheetDesigner'

function SheetDesigner() {
  useHandleTabClose(WINDOWS_NAME)
  useEffect(() => {
    document.title = '表单设计'
  }, [])
  return <div>开发中...</div>
}

export default SheetDesigner
