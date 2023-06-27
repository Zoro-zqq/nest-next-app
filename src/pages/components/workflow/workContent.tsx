import React, { useEffect, useState, Suspense, lazy } from 'react'
import { AppState } from '../../store/store'
import { useSelector } from 'react-redux'
import { Button, Row, Col, Empty } from 'antd'
const WebForm = lazy<any>(() => import('../../components/webfrom/index.tsx'))

export default function WorkContent() {
  const { currentData } = useSelector((state: AppState) => state.coop)
  const [headBtn, setHeadBtn] = useState(null)

  function sendNext() {}
  function back() {}
  function endCoop() {}
  //注册所有公共自定义dom组件
  useEffect(() => {
    import('../../utils/defineCustomElements.ts').then(({ defineElements }) => {
      defineElements()
    })
  }, [])
  useEffect(() => {
    if (!currentData) return
    import(`../../settings/coop/${currentData.CoopType}.config`).then(res => {
      const workNodes = res.default.workNodes
      const index = workNodes.findIndex(node => node.nodeKey === currentData.WorkNode)
      let btn
      if (index === 0) {
        btn = [
          <Button type='primary' key='toNext' onClick={sendNext}>
            发送到下一步
          </Button>
        ]
      } else if (index === workNodes.length - 1) {
        btn = [
          <Button onClick={endCoop} key='end' type='primary'>
            办结
          </Button>
        ]
      } else {
        btn = [
          <Button key='back' onClick={back}>
            退回
          </Button>,
          <Button style={{ marginLeft: '10px' }} type='primary' key='next' onClick={sendNext}>
            发送到下一步
          </Button>
        ]
      }
      setHeadBtn(btn)
    })
  }, [currentData])
  return currentData ? (
    <div style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
      <Row style={{ padding: '10px' }}>
        <Col span={20}></Col>
        <Col span={4}>{headBtn || <></>}</Col>
      </Row>
      <Suspense fallback={<>加載中...</>}>
        <WebForm
          sheetId={currentData.CoopID}
          sheet={currentData.CoopType === 'pickTask' ? 'pick' : 'task'}
        />
      </Suspense>
    </div>
  ) : (
    <div
      style={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Empty
        style={{ marginTop: '20px', fontSize: '24px' }}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span>选择任务箱任务</span>}
      />
    </div>
  )
}
