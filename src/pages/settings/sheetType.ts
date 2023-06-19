export type customEventItem = {
  ele: Element
  eventName: string
  eventFunc: EventListenerOrEventListenerObject
}
export interface styleType {
  fontFamily: string
  fontSize: string | number
  color: string
  verticalAlign: string
  textAlign?: string
  borderTop?: string
  borderBottom?: string
  borderLeft?: string
  borderRight?: string
  wordWrap?: string
}
export interface ResultObj {
  tableArea: AreaObj
  tablename: string
  tmplrows: number
  colspan: number
  rowspan: number
  info: any
  styleObject: any
  isTable: boolean
  key: string
  type: string
  field: string
  width: number
  height: number
  realWidth: number
  realHeight: number
  isMaster: boolean
  cellMaster: any
  IsMerge: any
  tableOpts: dataItem
}
export type cellItem = {
  text: string
  style: styleType
}
export type bindItem = {
  field: string
  type: string
  default?: string
  required?: string
  formula?: string
  options?: Record<string, string>
  colspan?: number
  rowspan?: number
  style: styleType
}
export type dataItem = {
  entity: string
  layout: string
  area?: string
  pk?: string
  bind: Record<string, bindItem>
}
export type ColItem = Partial<ResultObj>
export type ColObj = {
  height: number
  cols: Array<ColItem>
}
export type AnyObject = { [key: string]: any }
export interface AreaObj {
  tl: CellLetter
  br: CellLetter
}
export class CellLetter {
  public x: number
  public y: number
  public cellLetter: string

  constructor(p1: number, p2: number, cellLetter = '') {
    this.x = p1
    this.y = p2
    this.cellLetter = cellLetter
  }

  GetCellLetter(): string {
    if (this.x < 0) throw new Error()
    let cell = '',
      num: number = this.x + 1
    while (num >= 1) {
      const charCode: number = Number('A'.codePointAt(0)) + ((num - 1) % 26)
      cell = String.fromCodePoint(charCode) + cell
      num = Math.floor((num - 1) / 26)
    }
    this.cellLetter = ''.concat(cell).concat(String(this.y + 1))
    return this.cellLetter
  }
}
