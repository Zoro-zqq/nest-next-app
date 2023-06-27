type minAndMaxWH = {
  minHeight: number
  maxHeight: number
  minWidth: number
  maxWidth: number
}

export default function CellInputTSX() {
  if (!HTMLElement) {
    return null
  }

  class handleCellInput {
    public cellDom: HTMLTextAreaElement
    private minAndMaxWH: minAndMaxWH = {
      minHeight: 30,
      maxHeight: 125,
      minWidth: 100,
      maxWidth: 300
    }
    private bodyDom: HTMLElement = document.body
    private spanDom: HTMLSpanElement = document.createElement('span')
    private textNode = document.createTextNode('')
    constructor(target: HTMLTextAreaElement) {
      this.cellDom = target
    }
    init(options: minAndMaxWH, flag: boolean) {
      if (options && options.minHeight) {
        this.minAndMaxWH.minHeight = options.minHeight
      }
      if (options && options.maxHeight) {
        this.minAndMaxWH.maxHeight = options.maxHeight
      }
      if (options && options.minWidth) {
        this.minAndMaxWH.minWidth = options.minWidth
      }
      if (options && options.maxWidth) {
        this.minAndMaxWH.maxWidth = options.maxWidth
      }
      this.spanDom.firstChild ||
        ((this.spanDom.className = 'autoResize'),
        (this.spanDom.style.display = 'inline-block'),
        this.spanDom.appendChild(this.textNode))
      if ('TEXTAREA' == this.cellDom.nodeName) {
        this.cellDom.style.resize = 'none'
        this.cellDom.style.height = this.minAndMaxWH.minHeight + 'px'
        this.cellDom.style.maxHeight = this.minAndMaxWH.maxHeight + 'px'
        this.cellDom.style.minWidth = this.minAndMaxWH.minWidth + 'px'
        this.cellDom.style.maxWidth = this.minAndMaxWH.maxWidth + 'px'
        this.cellDom.style.overflowY = 'hidden'
      }
      /* if (flag) {
        addEvent(this.cellDom, "change", this.resize);
        addEvent(this.cellDom, "cut", this.setTimeoutResize);
        addEvent(this.cellDom, "paste", this.setTimeoutResize);
        addEvent(this.cellDom, "drop", this.setTimeoutResize);
        addEvent(this.cellDom, "keydown", this.setTimeoutResize);
        addEvent(this.cellDom, "focus", this.resize);
        addEvent(this.cellDom, "compositionstart", this.setTimeoutResize);
        addEvent(this.cellDom, "compositionupdate", this.setTimeoutResize);
        addEvent(this.cellDom, "compositionend", this.setTimeoutResize);
      }
      this.resize();*/
    }
    resize(str: string | void): void {
      const currentStyle = getComputedStyle(this.cellDom)
      str ? /^[a-zA-Z.,\\/|0-9]$/.test(str) || (str = '.') : (str = '')
      !this.textNode.textContent
        ? (this.textNode.textContent = this.cellDom.value + str)
        : (this.textNode.data = this.cellDom.value + str)
      this.spanDom.style.fontSize = currentStyle.fontSize
      this.spanDom.style.fontFamily = currentStyle.fontFamily
      this.spanDom.style.whiteSpace = 'pre'
      this.bodyDom.appendChild(this.spanDom)
      const spanDomWidth = this.spanDom.clientWidth + 2
      this.bodyDom.removeChild(this.spanDom)
      this.cellDom.style.height = this.minAndMaxWH.minHeight + 'px'
      this.minAndMaxWH.minWidth > spanDomWidth
        ? (this.cellDom.style.width = this.minAndMaxWH.minWidth + 'px')
        : spanDomWidth > this.minAndMaxWH.maxWidth
        ? (this.cellDom.style.width = this.minAndMaxWH.maxWidth + 'px')
        : (this.cellDom.style.width = spanDomWidth + 'px')
      const scrollHeight = this.cellDom.scrollHeight ? this.cellDom.scrollHeight - 1 : 0
      this.minAndMaxWH.minHeight > scrollHeight
        ? (this.cellDom.style.height = this.minAndMaxWH.minHeight + 'px')
        : this.minAndMaxWH.maxHeight < scrollHeight
        ? ((this.cellDom.style.height = this.minAndMaxWH.maxHeight + 'px'),
          (this.cellDom.style.overflowY = 'visible'))
        : (this.cellDom.style.height = scrollHeight + 'px')
    }
    setTimeoutResize() {
      setTimeout(this.resize, 0)
    }
  }
  return class CellInput extends HTMLElement {
    public customELE: any
    public $sheet: any
    public expressionPos: any
    public tableinfo: any
    public SHEETDIV: any
    public tdObj: any
    public CELL: any
    public SetVal: any
    public _initok: boolean | undefined
    public _options: any
    public _span: any
    public _textarea: HTMLTextAreaElement | undefined
    public _bordDIV: HTMLDivElement | undefined
    public _value: any
    constructor() {
      super()
    }

    get customDomThis() {
      if (this.customELE) {
        let e = this.customELE
        if (this.customELE._wrapper) {
          e = this.customELE.vueComponent
        }
        return e
      }
    }

    connectedCallback() {
      if (this._initok) return
      this.SetVal = this.setVal
      let tdObj = JSON.parse(this.getAttribute('data-col'))
      const obj = {
        $sheet: this.$sheet,
        expressionPos: this.expressionPos,
        tableinfo: this.tableinfo,
        SHEETDIV: this.SHEETDIV,
        tdObj: tdObj,
        cellinfo: tdObj.info,
        CELL: this.parentElement
      }
      if (obj.cellinfo) {
        this._options = obj.cellinfo.options
      }
      Object.assign(this, obj)
      const spanDom = document.createElement('span')
      if (this.children.length > 0) {
        this.customELE = this.children[0]
        this.customELE.cellinput = this
        this.customELE.style.zIndex = '4'
        this.customELE.style.padding = '0 2px'
        this.customELE.style.cursor = 'default'
        this.customELE.onInit && this.customELE.onInit(this._options)
        this.customELE.addEventListener('change', (e: Event) => {
          e.target == this.customELE && window.dispatchEvent(new CustomEvent('change', e))
        })
        this.customELE.addEventListener('textchange', (e: Event) => {
          e.target == this.customELE && window.dispatchEvent(new CustomEvent('textchange', e))
        })
        this._span = {
          Show: () => (this.customELE.style.visibility = 'visible'),
          Hide: () => (this.customELE.style.visibility = 'hidden')
        }
      } else {
        spanDom.style.whiteSpace = 'pre-line'
        spanDom.style.zIndex = '4'
        this._span = spanDom
        this._span.Show = () => (spanDom.style.visibility = 'visible')
        this._span.Hide = () => (spanDom.style.visibility = 'hidden')
        this._span.SetText = (e: string | null) => (spanDom.textContent = e)
        this.appendChild(spanDom)
      }
      this.style.position = 'relative'
      this.setAttribute('tabindex', '1')
      this.setAttribute('name', 'cellinput')
      const textareaDom = document.createElement('textarea')
      Object.assign(textareaDom.style, {
        zIndex: '1',
        outline: 'none',
        border: '0px green solid',
        resize: 'none',
        overflowY: 'hidden',
        paddingLeft: '2px',
        boxSizing: 'content-box',
        height: '1px',
        width: '1px',
        opacity: '0',
        position: 'absolute',
        top: '-1px',
        left: '-1px'
      })
      let textAreaIsOpened = false
      this._textarea = textareaDom
      this.appendChild(textareaDom)
      //边框
      const divDom: HTMLDivElement = document.createElement('div')
      Object.assign(divDom.style, {
        zIndex: '2',
        border: '0px rgb(75, 137, 255) solid',
        boxSizing: 'border-box',
        height: 'calc(100% + 2px)',
        width: 'calc(100% + 2px)',
        position: 'absolute',
        top: '-1px',
        left: '-1px'
      })
      this._bordDIV = divDom
      this.appendChild(divDom)
      //是否只读
      if ('true' === this.getAttribute('readonly')) {
        this._initok = true
        return
      }
      const textInput = new handleCellInput(textareaDom)
      this.addEventListener('focus', t => {
        divDom.style.borderWidth = '2px'
        this._span && this._span.Show()
      })
      this.addEventListener('blur', e => {
        divDom.style.borderWidth = '0px'
        this._span && this._span.Show()
      })
      this.addEventListener('paste', (e: ClipboardEvent) => {
        //获得剪切板数据
        this.value = e.clipboardData!.getData('text/plain')
      })
      let nowTime = new Date().getTime()
      this.addEventListener('click', e => {
        if (new Date().getTime() - nowTime < 500) {
          const t: Event = new MouseEvent('dblclick2', {
            bubbles: false,
            cancelable: true
          })
          this.dispatchEvent(t)
          nowTime = 0
        } else {
          nowTime = new Date().getTime()
        }
      })
      this.addEventListener('dblclick2', (e: Event) => {
        if (!textAreaIsOpened) {
          if (this.customELE) {
            e.preventDefault()
            e.stopPropagation()
            return
          }
          textInput.init(
            {
              minWidth: divDom.clientWidth - 2,
              maxWidth: divDom.clientWidth - 2,
              minHeight: divDom.clientHeight,
              maxHeight: 3 * divDom.clientHeight
            },
            true
          )
          textAreaIsOpened = true
          textareaDom.style.zIndex = '3'
          textareaDom.style.borderWidth = '2px'
          textareaDom.value = this.value || ''
          textareaDom.style.opacity = '1'
          textareaDom.focus()
          this._span && this._span.Hide()
        }
      })
      textareaDom.addEventListener('blur', FocusEvent => {
        textareaDom.style.borderWidth = '0px'
        textareaDom.style.opacity = '0'
        this._span && this._span.Show()
        textareaDom.style.zIndex = '1'
        textAreaIsOpened = false
        this.value !== textareaDom.value && (this.value = textareaDom.value)
      })
      textareaDom.addEventListener('paste', (e: ClipboardEvent) => {
        '0' != textareaDom.style.opacity ? e.stopPropagation() : e.preventDefault()
      })
      textareaDom.addEventListener('keydown', (e: KeyboardEvent) => {
        //tab切换到下一个单元格
        if (e.keyCode == 9) {
          e.preventDefault()
          const domArr = document.querySelectorAll('sheet-cell-input')
          const index = Array.from(domArr).findIndex((e: Element) => e == this)
          if (index >= 0 && index < domArr.length - 1) {
            //找到下一个
            const nextCell = domArr[index + 1]
            const nextCellStyle = getComputedStyle(nextCell)
            if (nextCellStyle.display != 'none' && nextCellStyle.visibility != 'hidden') {
              const t: Event = new MouseEvent('dblclick2', {
                bubbles: false,
                cancelable: true
              })
              nextCell.dispatchEvent(t)
            } else {
              this.focus()
            }
          }
          e.stopPropagation()
          return
        }
        textInput.resize(String.fromCharCode(e.keyCode))
      })
      if (this.customELE) {
        Object.assign(this.customELE, obj)
        if (!this.customELE.$SheetOpts) this.customELE.$SheetOpts = obj
        this.customELE._wrapper || (this.customELE.onMounted && this.customELE.onMounted())
      }
      window.dispatchEvent(
        new CustomEvent('loaded', {
          bubbles: false,
          cancelable: false,
          detail: [this, tdObj.field]
        })
      )
      this._initok = true
      setTimeout(() => {
        if (this.customDomThis) {
          this.customDomThis.CELL = this.parentElement
        }
      })
    }

    setVal(newVal: any, flag: boolean) {
      if (newVal === this.value) return
      this._value = newVal || ''
      if (this.customDomThis) return void this.customDomThis.setVal(newVal, flag)
      this._textarea!.value = this._value
      this._span.textContent = this.text
      window.dispatchEvent(
        new CustomEvent('textchange', {
          bubbles: false,
          cancelable: false,
          detail: [this.text, this.tdObj.field]
        })
      )
      if (flag) {
        window.dispatchEvent(
          new CustomEvent('change', {
            bubbles: false,
            cancelable: false,
            detail: [newVal, this.tdObj.field]
          })
        )
      }
    }

    set value(val: any) {
      this.setVal(val, true)
    }

    get value() {
      return void 0 === this._value || null === this._value ? '' : this._value
    }

    get text() {
      return String(this._value)
    }

    beginEdit() {
      if (this.customDomThis && this.customDomThis.onTextditorBeginEdit) {
        this.customDomThis.onTextditorBeginEdit({
          TEXTAREA: this._textarea,
          TD: this.parentNode,
          SHEETDIV: this.SHEETDIV
        })
      }
      this.dispatchEvent(
        new CustomEvent('beginedit', {
          bubbles: !1,
          cancelable: !1,
          detail: [{ ok: true }]
        })
      )
      return true
    }

    closeEditor() {
      if (this.customDomThis && this.customDomThis.onTextditorClose) {
        this.customDomThis.onTextditorClose({
          TEXTAREA: this._textarea,
          TD: this.parentNode,
          SHEETDIV: this.SHEETDIV
        })
      }
    }

    startEdit(e: any, t: any) {
      let n = true
      if (this.customDomThis && this.customDomThis.startEdit) {
        n = this.customDomThis.startEdit(e, t)
      }
      return n
    }
  }
}
