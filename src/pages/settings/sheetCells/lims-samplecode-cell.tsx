//生成样品编码组件，可基于这个进行二次开发
import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Button, Input, Modal } from 'antd'

let cellthis
let el
function SampleCodeModal(props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [sampleCode, setSampleCode] = useState('')
  useEffect(() => {
    setModalOpen(props.show)
    setSampleCode(props.sampleCode)
  }, [props.show])
  const changeBottleCode = () => {
    setSampleCode('xxxx')
  }
  const ok = () => {
    cellthis.value = sampleCode
    setModalOpen(false)
    if (cellthis.destroyDom) {
      cellthis.destroyDom()
      delete cellthis.destroyDom
    }
  }
  return (
    <>
      <Modal
        title='生成样品编号'
        zIndex={100001}
        style={{ top: 30 }}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={ok}
        maskClosable={true}
        bodyStyle={{ padding: '20px' }}
        cancelText='取消'
        okText='确认'
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: '1', marginRight: '15px' }}>
            <span style={{ marginRight: '15px' }}>样品编码:</span>
            <Input
              value={sampleCode}
              onChange={e => setSampleCode(e.target.value)}
              size='small'
              styles={{ input: { width: '240px' } }}
            />
          </div>
          <Button type='primary' size='small' onClick={changeBottleCode}>
            生成编号
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default function SampleCodeTSX() {
  if (typeof HTMLElement == 'undefined') {
    return
  }
  return class SampleCode extends HTMLElement {
    readonly: any
    _value: any
    renderVm: any
    destroyDom: any
    renderDom: any
    init: boolean
    constructor() {
      super()
    }

    startEdit(eventArgs, $sheet) {
      //单元格编辑事件
      //返回false代表不希望首次输入按键值会有效果,并且这也意味着放弃Tag效果,专注自定义单元格
      if (this.readonly) return false
      //有样品编码就不在弹窗 进入单元格直接修改
      if (this._value) return true
      cellthis = this //将单元格this抛出在vue组件里面处理
      if (!el) {
        el = document.createElement('div')
        document.body.appendChild(el)
      }
      const root = createRoot(el)
      this.renderVm = root
      root.render(<SampleCodeModal show={true} sampleCode={this._value || ''} />)
      if (!this.destroyDom)
        this.destroyDom = () => {
          if (this.renderVm.unmount) this.renderVm.unmount()
          this.renderVm = null
        }

      return false
    }

    SetVal(val, flag) {
      //拦截单元格赋值前的操作//
      if (val == '') {
        this._value = ''
      } else {
        try {
          this._value = val
        } catch (error) {
          return
        }
      }
      if (this.renderDom) this.renderDom()
      if (flag) {
        this.dispatchEvent(
          new CustomEvent('change', {
            bubbles: false,
            cancelable: false,
            detail: [val]
          })
        )
      }
    }

    set value(val) {
      //单元格赋值触发
      this.SetVal(val, true)
    }

    get value() {
      //获取单元格value值
      return this._value
    }

    get text() {
      if (!this._value) {
        return ''
      }
      let textContent = `${this._value}`.replace('web_', '')
      return textContent
    }

    connectedCallback() {
      //数据未加工事件
      if (!this.init) {
        let div = document.createElement('div')
        this.appendChild(div)
        this.renderDom = () => {
          if (this.firstChild) {
            this.firstChild.textContent = this.text
          } else {
            this.textContent = this.text
          }
        }
        this.init = true
      }
    }

    disconnectedCallback() {
      const _this = this
      if (_this.destroyDom) _this.destroyDom()
    }
  }
}
