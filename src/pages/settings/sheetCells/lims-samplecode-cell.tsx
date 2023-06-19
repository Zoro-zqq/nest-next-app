//生成样品编码组件，可基于这个进行二次开发
import { useState, useRef, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Button, Input, Modal } from 'antd'

// 获取质控类型字典项
function getSampleQCTypeDict() {
  return [
    {
      QCTypeID: 1,
      QCTypeName: '普通样',
      QCTypeCode: '1',
      QCTypeMem: '',
      SampleMappingTable: '',
      color: '',
      text: '普通样',
      sign: ''
    },
    {
      QCTypeID: 2,
      QCTypeName: '现场平行样',
      QCTypeCode: '2',
      QCTypeMem: '',
      SampleMappingTable: 'ST_MainSample_QC_Paralel',
      color: 'rgb(244,176,132)',
      text: '平行样',
      sign: 'P'
    },
    {
      QCTypeID: 3,
      QCTypeName: '现场空白样',
      QCTypeCode: '3',
      QCTypeMem: '',
      SampleMappingTable: 'ST_MainSample_QC_Blank',
      color: 'rgb(198, 224, 180)',
      text: '空白样',
      sign: 'K'
    },
    {
      QCTypeID: 4,
      QCTypeName: '现场加标样',
      QCTypeCode: '4',
      QCTypeMem: '',
      SampleMappingTable: 'ST_MainSample_QC_AddedSpecimen',
      color: '',
      text: '',
      sign: ''
    },
    {
      QCTypeID: 5,
      QCTypeName: '密码平行样',
      QCTypeCode: '5',
      QCTypeMem: '',
      SampleMappingTable: 'ST_MainSample_QC_Paralel',
      color: '',
      text: '',
      sign: ''
    },
    {
      QCTypeID: 6,
      QCTypeName: '密码空白样',
      QCTypeCode: '6',
      QCTypeMem: '',
      SampleMappingTable: 'ST_MainSample_QC_Blank',
      color: '',
      text: '',
      sign: ''
    },
    {
      QCTypeID: 7,
      QCTypeName: '密码加标样',
      QCTypeCode: '7',
      QCTypeMem: '',
      SampleMappingTable: 'ST_MainSample_QC_AddedSpecimen',
      color: '',
      text: '',
      sign: ''
    },
    {
      QCTypeID: 8,
      QCTypeName: '密码标准物质',
      QCTypeCode: '8',
      QCTypeMem: '',
      SampleMappingTable: 'ST_MainSample_QC_StandardControl',
      color: '',
      text: '',
      sign: ''
    },
    {
      QCTypeID: 9,
      QCTypeName: '室内平行样',
      QCTypeCode: '9',
      QCTypeMem: '',
      SampleMappingTable: 'ST_MainSample_QC_Paralel',
      color: '',
      text: '',
      sign: ''
    },
    {
      QCTypeID: 10,
      QCTypeName: '室内空白样',
      QCTypeCode: '10',
      QCTypeMem: '',
      SampleMappingTable: 'ST_MainSample_QC_Blank',
      color: '',
      text: '',
      sign: ''
    },
    {
      QCTypeID: 11,
      QCTypeName: '室内加标样',
      QCTypeCode: '11',
      QCTypeMem: '',
      SampleMappingTable: 'ST_MainSample_QC_AddedSpecimen',
      color: '',
      text: '',
      sign: ''
    },
    {
      QCTypeID: 12,
      QCTypeName: '室内标准物质',
      QCTypeCode: '12',
      QCTypeMem: '自己主动向质管室要的标准物质',
      SampleMappingTable: 'ST_MainSample_QC_StandardControl',
      color: '',
      text: '',
      sign: ''
    },
    {
      QCTypeID: 13,
      QCTypeName: '留样',
      QCTypeCode: '13',
      QCTypeMem: '',
      SampleMappingTable: '',
      color: '',
      text: '',
      sign: ''
    },
    {
      QCTypeID: 14,
      QCTypeName: '穿透',
      QCTypeCode: '14',
      QCTypeMem: '现场穿透样',
      SampleMappingTable: 'ST_MainSample_QC_Penetrate',
      color: 'rgb(114, 160, 254)',
      text: '穿透样',
      sign: 'C'
    },
    {
      QCTypeID: 15,
      QCTypeName: '串联样',
      QCTypeCode: '15',
      QCTypeMem: '现场串联样',
      SampleMappingTable: '',
      color: 'rgb(0, 194, 167)',
      text: '串联样',
      sign: 'B'
    },
    {
      QCTypeID: 16,
      QCTypeName: '中间点',
      QCTypeCode: '16',
      QCTypeMem: '曲线中间点',
      SampleMappingTable: '',
      text: '曲线中间点',
      sign: 'CCV'
    },
    {
      QCTypeID: 17,
      QCTypeName: '零点',
      QCTypeCode: '17',
      QCTypeMem: '曲线零点',
      SampleMappingTable: '',
      text: '曲线零点',
      sign: ''
    },
    {
      QCTypeID: 18,
      QCTypeName: '空白加标样',
      QCTypeCode: '18',
      QCTypeMem: '空白加标样',
      SampleMappingTable: '',
      text: '空白加标样',
      sign: ''
    }
  ]
}

// 获取现在质控类型字典
function getSampleQCTypeDictByScene() {
  let dict = {}
  let scene = [2, 3, 14, 15]
  let data = getSampleQCTypeDict()
  for (const item of data) {
    if (scene.includes(item.QCTypeID)) {
      dict[item.QCTypeID] = {
        text: item.text,
        sign: item.sign,
        color: item.color
      }
    }
  }
  return dict
}

let cellthis
let el = document.createElement('div')
document.body.appendChild(el)

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
class SampleCode extends HTMLElement {
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

export default SampleCode
