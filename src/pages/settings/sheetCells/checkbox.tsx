import { isEqual } from 'lodash'
import { createRoot } from 'react-dom/client'
import { Checkbox } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'

export default function WebSheetCheckBoxJSX() {
  if (typeof HTMLElement == 'undefined') {
    return
  }
  return class WebSheetCheckBox extends HTMLElement {
    public _value: any | undefined
    public init: boolean | undefined
    public checkboxVM: any | undefined
    public destroyDom: any | undefined
    public cellinfo: any | undefined
    constructor() {
      super()
    }

    connectedCallback() {
      const _this = this
      const { cellinfo } = _this

      if (!_this.init) {
        _this._value = []
        if (!_this.checkboxVM) {
          const dom = document.createElement('div')
          this.appendChild(dom)

          const root = createRoot(dom)
          const onChange = (checkedValues: CheckboxValueType[]) => {
            _this.setVal(JSON.stringify(checkedValues), true)
          }
          root.render(<Checkbox.Group options={cellinfo.options.entity} onChange={onChange} />)
          dom.addEventListener('mousedown', (e: MouseEvent) => {
            e.stopPropagation()
          })
          _this.checkboxVM = root
          //销毁dom
          _this.destroyDom = () => {
            if (_this.checkboxVM) {
              if (_this.checkboxVM.unmount) _this.checkboxVM.unmount()
              _this.checkboxVM = null
            }
          }
        }
        _this.init = true
      }
    }

    disconnectedCallback() {
      const _this = this
      if (_this.destroyDom) _this.destroyDom()
    }

    set value(val) {
      this.setVal(val, true)
    }

    get value() {
      return this._value
    }

    setVal(val: any, flag: boolean) {
      if (val == '') val = '[]'
      if (isEqual(val, JSON.stringify(this.value))) return

      try {
        this._value = JSON.parse(val)
        if (!Array.isArray(this._value)) {
          throw '不是正确数组'
        }
      } catch (error) {
        return
      }
      if (!flag) return
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: false,
          cancelable: false,
          detail: [this._value, this.cellinfo.field]
        })
      )
    }
    beginEdit() {
      return false
    }
    static get isObjectVal() {
      return true
    }
  }
}
