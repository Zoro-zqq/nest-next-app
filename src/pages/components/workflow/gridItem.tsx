import React, { useEffect, useCallback, useState } from 'react'
import { AppState } from '../../store/store'
import { setCurrentData } from '../../store/slice/coopSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'antd'

export default function GridItem({ data, type }) {
  const { currentData } = useSelector((state: AppState) => state.coop)
  const [isCurrent, setIsCurr] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    setIsCurr(currentData && data && currentData.CoopID === data.CoopID)
  }, [currentData])
  const selectCurr = useCallback(() => {
    dispatch(
      setCurrentData({
        CoopID: data.CoopID,
        type
      })
    )
  }, [type])
  return (
    <Card
      key={data.CoopID}
      style={{ cursor: 'pointer', width: '90%', backgroundColor: isCurrent ? 'skyblue' : '#fff' }}
      title={data.CoopInfo.Name}
      bordered={false}
      onClick={selectCurr}
    >
      <p>测试采样任务流程节点 {data.CoopInfo.WorkNode}</p>
    </Card>
  )
}
