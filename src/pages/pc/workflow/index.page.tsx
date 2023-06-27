import React, { useEffect, useCallback, useState, Suspense } from 'react'
import useHandleTabClose from '../../hooks/handleTabClose.hook.ts'
import authGuard from '../../utils/authGuard.ts'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  DesktopOutlined,
  PieChartOutlined,
  InsertRowLeftOutlined,
  InsertRowRightOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, theme, Row, Col, Modal, Tooltip, Tabs, Card } from 'antd'
import type { MenuProps } from 'antd'
import styles from './scss/index.module.scss'
import { AppState, useAppDispatch } from '../../store/store.ts'
import { createNewCoop, getAllTask } from '../../store/slice/coopSlice.ts'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
import Avatar from '../../components/avatar/Avatar.tsx'
// import WorkContent from '../../components/workflow/workContent'
import TodoList from '../../components/workflow/todoList.tsx'
import DoingList from '../../components/workflow/doingList.tsx'
import DoneList from '../../components/workflow/doneList.tsx'

const WorkContent = dynamic(
  () => import('../../components/workflow/workContent.tsx').then(mod => mod.default),
  { suspense: true }
)

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
    document.title = '工作流'

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
