import React, { Suspense, lazy, useEffect } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import styles from './index.module.scss'
const WebForm = lazy<any>(() => import('../../components/webfrom/index.tsx'))

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `采样单`,
    children: (
      <Suspense fallback={<>加載中...</>}>
        <WebForm bg='rgb(39, 39, 40)' sheetId='pick' sheet='pick' />
      </Suspense>
    )
  },
  {
    key: '2',
    label: `任务单`,
    children: (
      <Suspense fallback={<>加載中...</>}>
        <WebForm bg='rgb(39, 39, 40)' sheetId='task' sheet='task' />
      </Suspense>
    )
  }
]

const onChange = (key: string) => {
  console.log(key)
}

function ToggleSheet() {
  //注册所有公共自定义dom组件
  useEffect(() => {
    import('../../utils/defineCustomElements.ts').then(({ defineElements }) => {
      defineElements()
    })
  }, [])
  return (
    <>
      <div
        style={{
          backgroundColor: '#272728',
          height: '28px'
        }}
        className='w-full'
      ></div>
      <div
        style={{
          backgroundColor: `rgb(39, 39, 40)`,
          height: `calc(100% - 30px)`
        }}
      >
        <Tabs
          className={styles['tabs']}
          style={{
            height: '100%'
          }}
          defaultActiveKey='1'
          size='large'
          items={items}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default ToggleSheet
