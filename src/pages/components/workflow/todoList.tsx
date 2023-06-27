import GridItem from './gridItem'
import React, { Suspense } from 'react'
import { AppState } from '../../store/store'
import { useSelector } from 'react-redux'
import { Empty } from 'antd'
import styles from './scss/index.module.scss'

export default function TodoList() {
  const { toDoList } = useSelector((state: AppState) => state.coop)
  return toDoList.length ? (
    <div className={styles['to-do']}>
      {toDoList.map(data => {
        return (
          <Suspense key={data.CoopID} fallback={<>loading</>}>
            <GridItem data={data} key={data.CoopID} type='todo' />
          </Suspense>
        )
      })}
    </div>
  ) : (
    <div style={{ minHeight: '50vh' }}>
      <Empty style={{ marginTop: '20px' }} description={<span>暂无任务</span>} />
    </div>
  )
}
