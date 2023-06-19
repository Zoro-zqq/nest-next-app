import React, { useEffect, useCallback, useState, Suspense, lazy } from 'react'
import useHandleTabClose from '../../hooks/handleTabClose.hook'
import authGuard from '../../utils/authGuard'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  DesktopOutlined,
  PieChartOutlined,
  InsertRowLeftOutlined,
  InsertRowRightOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, theme, Row, Col, Modal, Tooltip, Tabs, Empty, Card } from 'antd'
import type { MenuProps } from 'antd'
import styles from './scss/index.module.scss'
import request from '../../utils/request'
import { AppState, useAppDispatch } from '../../store/store'
import { createNewCoop, getAllTask, setCurrentData } from '../../store/slice/coopSlice'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../../components/avatar/Avatar'
const WebForm = lazy(() => import('../../components/webfrom/index.tsx').then(mod => mod.default))
type MenuItem = Required<MenuProps>['items'][number]
const WINDOWS_NAME = 'custom'
const { Header, Sider, Content } = Layout

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('工作流/自定义表单', '1', <PieChartOutlined />),
  getItem('表单设计器', '2', <DesktopOutlined />)
]

const tabsItem = [
  [InsertRowLeftOutlined, '待办箱', TodoList],
  [InsertRowRightOutlined, '在办箱', DoingList],
  [InsertRowLeftOutlined, '已办箱', DoneList]
].map(([Icon, title, Comp], i) => {
  return {
    label: (
      <span>
        <Icon />
        {title as string}
      </span>
    ),
    key: String(i),
    children: <Comp />
  }
})

function GridItem({ data, type }) {
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

function TodoList() {
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

function DoingList() {
  return <div>todo</div>
}

function DoneList() {
  return <div>已办箱</div>
}

function WorkContent() {
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

function Workflow() {
  //处理tab打开/关闭时
  useHandleTabClose(WINDOWS_NAME)

  const [collapsed, setCollapsed] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { userInfo } = useSelector((state: AppState) => state.auth)
  const asyncDispatch = useAppDispatch()
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const selectMenuItem = useCallback(e => {
    console.log(e)
  }, [])

  const createNewFlowTask = async () => {
    await asyncDispatch(createNewCoop(userInfo?.userId || ''))
    setModalOpen(false)
  }

  useEffect(() => {
    asyncDispatch(getAllTask())
  }, [])

  return (
    <Layout className={styles['coop-wrapper']}>
      <Modal
        title='新建流程任务'
        style={{ top: 30 }}
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
        maskClosable={true}
        bodyStyle={{ padding: '20px' }}
      >
        <Card
          style={{
            width: 160,
            border: '1px solid #000',
            fontSize: '18px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onClick={createNewFlowTask}
        >
          下达任务单
        </Card>
      </Modal>
      <Sider
        theme='light'
        style={{ borderRight: '1px solid #bbbbbb' }}
        trigger={null}
        width='20vw'
        collapsedWidth={0}
        collapsible
        collapsed={collapsed}
      >
        <Row className={styles['coop-left__row']} justify='space-between'>
          <Col flex='none'>
            <div style={{ padding: '0 16px' }}></div>
          </Col>
          <Col style={{ fontSize: '18px' }} span={18}>
            点击添加按钮新建任务
          </Col>
          <Col span={2}>
            <Tooltip title='新建任务'>
              <Button
                onClick={() => setModalOpen(true)}
                size='large'
                type='primary'
                shape='circle'
                icon={<PlusOutlined />}
              />
            </Tooltip>
          </Col>
          <Col flex='none'>
            <div style={{ padding: '0 16px' }}></div>
          </Col>
        </Row>
        <Tabs
          style={{ padding: '0 20px' }}
          className={styles['tabs']}
          defaultActiveKey='0'
          size='large'
          items={tabsItem}
        />
      </Sider>
      <Layout className={styles['coop-right']}>
        <Header style={{ paddingTop: '30px', height: '100px', background: colorBgContainer }}>
          <Row justify='space-between'>
            <Col style={{ fontSize: '24px' }} span={1}>
              <Button
                type='text'
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64
                }}
              />
            </Col>
            <Col span={20}>
              <Suspense fallback={<></>}>
                <div className={`${styles['avatar']}`}>
                  <Avatar backgroundColor='#A469E5' />
                </div>
              </Suspense>
              <Menu
                style={{ gap: '20px' }}
                onClick={selectMenuItem}
                defaultSelectedKeys={['1']}
                mode='horizontal'
                theme='light'
                items={items}
              />
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          <Suspense fallback={<>loading...</>}>
            <WorkContent />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Workflow

//路由守卫
Workflow.getInitialProps = authGuard()
