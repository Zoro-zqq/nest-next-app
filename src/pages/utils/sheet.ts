import { cloneDeep, forEach, omit, pick } from 'lodash'
import {
  cellItem,
  bindItem,
  dataItem,
  ColItem,
  ColObj,
  AnyObject,
  AreaObj,
  CellLetter
} from '../settings/sheetType'
const PREFIX = 'sheet-'

function recur(str: string): number {
  switch (str.length) {
    case 0:
      throw new Error()
    case 1:
      return Number(str.codePointAt(0)) - Number('A'.codePointAt(0))
    default:
      return 26 * recur(str.slice(0, -1)) + recur(str[str.length - 1]) + 26
  }
}

export function parseCell(cell: string): CellLetter {
  const arr = /^([a-zA-Z]+)(\d+)$/.exec(cell)
  if (null === arr || 3 !== arr.length) throw new Error()
  const param1: number = recur(arr[1]),
    param2: number = Number(arr[2]) - 1
  return new CellLetter(param1, param2, cell)
}

function parseArea(area: string): AreaObj {
  const arr = area.split(':'),
    l = arr[0],
    r = arr[1]
  return { tl: parseCell(l), br: parseCell(r) }
}

function formatData(colObjArr: ColObj[]) {
  forEach(colObjArr, function (obj: ColObj, rowIndex) {
    forEach(obj.cols, function (col: ColItem, colIndex) {
      if (col.info && ((col.colspan as number) > 1 || (col.rowspan as number) > 1)) {
        const colSpanEnd = colIndex + (col.colspan as number) - 1,
          rowSpanEnd = rowIndex + (col.rowspan as number) - 1
        col.isMaster = true
        let wd = 0,
          ht = 0
        for (let colStart = colIndex; colStart <= colSpanEnd; colStart++) {
          for (let rowStart = rowIndex; rowStart <= rowSpanEnd; rowStart++) {
            //合并的宽高 为一行/一列里面合并单元格之和
            if (colStart === colIndex) {
              ht += colObjArr[rowStart].cols[colStart].height as number
            }
            if (rowStart === rowIndex) {
              wd += colObjArr[rowStart].cols[colStart].width as number
            }
            //以左上角一个单元格为基准
            if (colStart === colIndex && rowStart === rowIndex) {
              colObjArr[rowStart].cols[colStart].IsMerge = true
            } else {
              colObjArr[rowStart].cols[colStart].cellMaster = col
            }
          }
        }
        col.realWidth = wd
        col.realHeight = ht
      }
    })
  })
}
export function GetSheetCfg(tpl: Record<string, any>): Record<string, any> {
  const tplResult: Record<string, any> = {}
  const sheetData = {
    form: {}
  }
  const formData: Record<string, any> = (tpl.data as Array<any>).find(
    (e: { layout: string }) => e.layout === 'form'
  )
  forEach(tpl.cells, (item: cellItem, cell) => {
    tplResult[cell] = item
  })
  forEach(formData.bind, (item: bindItem, cell) => {
    tplResult[cell] = item
    if (item.field && !sheetData.form[item.field]) {
      sheetData.form[item.field] = item.default || ''
    }
  })
  //画出表单区域
  forEach(tpl.data, (d: dataItem) => {
    const layout: string = d.layout,
      entity: string = d.entity,
      area: string = d.area || '',
      rest = omit(d, ['layout', 'entity', 'area'])
    if ('form' != layout) {
      const tbArea: AreaObj = parseArea(area)
      tplResult[tbArea.tl.cellLetter] = {
        tableArea: tbArea,
        tablename: entity.replace('$data.', ''),
        tmplrows: 1,
        colspan: tbArea.br.x - tbArea.tl.x + 1,
        rowspan: tbArea.br.y - tbArea.tl.y + 1,
        tableOpts: rest
      }
    }
  })
  //处理单元格合并
  forEach(tpl.spans, span => {
    const spanArea: AreaObj = parseArea(span),
      { tl, br } = spanArea,
      cellObj = tplResult[tl.cellLetter]
    if (cellObj) {
      const xDistance = br.x - tl.x
      xDistance > 0 && (cellObj.colspan = xDistance + 1)
      const yDistance = br.y - tl.y
      yDistance > 0 && (cellObj.rowspan = yDistance + 1)
      tplResult[tl.cellLetter] = cellObj
    }
  })
  const binds: Record<string, any> = tplResult
  const widthsArray: number[] = Object.values(tpl.colWidth),
    heightsArray: number[] = Object.values(tpl.rowHeight)
  const areaDict: AnyObject = {}

  forEach(tpl.data, (d: dataItem) => {
    if ('form' == d.layout) {
      const arr: ColObj[] = []
      forEach(heightsArray, function (h: number, rowIndex: number) {
        const obj: ColObj = {
          height: 0,
          cols: []
        }
        obj.height = h
        forEach(widthsArray, function (w: number, colIndex: number) {
          //单元格序号 例如 A1
          const cellLetter = new CellLetter(colIndex, rowIndex).GetCellLetter()
          const cell = tplResult[cellLetter]
          const letterObj: ColItem = {}
          //是否是合并单元格区域的左上角
          if (cell) {
            letterObj.info = cell
            letterObj.isTable = !!cell.tablename
            Object.assign(letterObj, pick(cell, ['field', 'type', 'text']))
            letterObj.colspan = cell.colspan || 1
            letterObj.rowspan = cell.rowspan || 1
          }
          letterObj.key = cellLetter
          letterObj.width = letterObj.realWidth = w
          letterObj.height = letterObj.realHeight = h
          letterObj.styleObject = (letterObj.info && letterObj.info.style) || {}
          obj.cols.push(letterObj)
        })
        arr.push(obj)
      })
      formatData(arr)
      areaDict.form = {
        tbElements: arr,
        widths: cloneDeep(widthsArray),
        heights: cloneDeep(heightsArray)
      }
    }
    if ('table' == d.layout) {
      const cellObj: ColItem = tplResult[(d.area as string).split(':')[0]]
      if (!sheetData[cellObj!.tablename as string]) {
        sheetData[cellObj.tablename as string] = []
      }
      const tableColObjArr: ColObj[] = [],
        tableWhsArr: number[] = [],
        tableHtsArr: number[] = [],
        rowNum = cellObj.tableArea!.tl.y,
        startColNum = cellObj.tableArea!.tl.x,
        endColNum = cellObj.tableArea!.br.x
      for (let r_num = rowNum; r_num < rowNum + (cellObj.tmplrows || 1); r_num++) {
        const rowHt = heightsArray[r_num]
        const obj: ColObj = {
          height: rowHt,
          cols: []
        }
        tableHtsArr.push(rowHt)
        for (let colNum = startColNum; colNum <= endColNum; colNum++) {
          const colWh = widthsArray[colNum],
            letterObj: ColItem = {}
          //单元格序号 例如 A1
          const cellLetter = new CellLetter(colNum, r_num).GetCellLetter()
          const cell = d.bind[cellLetter]
          //是否是合并单元格区域的左上角
          if (cell) {
            letterObj.info = cell
            Object.assign(letterObj, pick(cell, ['field', 'type', 'text']))
          }
          letterObj.colspan = (cell && cell.colspan) || 1
          letterObj.rowspan = (cell && cell.rowspan) || 1
          letterObj.key = cellLetter
          letterObj.width = letterObj.realWidth = colWh
          letterObj.height = letterObj.realHeight = rowHt
          letterObj.styleObject = (letterObj.info && letterObj.info.style) || {}
          obj.cols.push(letterObj)
          if (r_num === rowNum) {
            tableWhsArr.push(colWh)
          }
        }
        tableColObjArr.push(obj)
      }
      formatData(tableColObjArr)
      areaDict[cellObj.tablename as string] = {
        tbElements: tableColObjArr,
        widths: tableWhsArr,
        heights: tableHtsArr
      }
    }
  })
  console.log('2: ', {
    widthsArray,
    heightsArray,
    binds,
    areaDict
  })
  return {
    widthsArray,
    heightsArray,
    binds,
    areaDict,
    SheetData: sheetData
  }
}

export function getWebComponentName(type: string) {
  return PREFIX + type
}
