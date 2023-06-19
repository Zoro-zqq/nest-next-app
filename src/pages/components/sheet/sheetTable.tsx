import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './scss/table.module.scss'
import Handsontable from 'handsontable'
import { registerLanguageDictionary, zhCN } from 'handsontable/i18n'
import { registerAllModules } from 'handsontable/registry'
import { TextEditor } from 'handsontable/editors/textEditor'
import 'handsontable/dist/handsontable.full.min.css'
import { cloneDeep, pick } from 'lodash'
import { setSheetDict } from '../../store/slice/sheetSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import type { GridSettings } from 'node_modules/handsontable/settings'
import { getWebComponentName } from '../../utils/sheet'

function formatStyle(
  e: Record<string, any>,
  styleObject: Record<string, any> | undefined
): Record<string, any> {
  return Object.assign(
    e.style,
    pick(styleObject || {}, [
      'background',
      'fontFamily',
      'fontSize',
      'color',
      'textAlign',
      'verticalAlign'
    ])
  )
}

function localSetTableData(
  sheetData,
  options: {
    tableName: string
    row: number
    col: string | number
    val: any
  }
) {
  let { row, tableName, val, col } = options
  const tableData = sheetData[tableName]
  if (isNaN(row) || (!tableData[row] && !val)) {
    return
  }
  if (col) {
    tableData[row][col] = val
  } else {
    tableData[row] = val
  }
  // return {
  //   ...sheetData,
  //   [tableName]: tableData
  // }
}

let globalHot: any

//register Handsontable's language
registerLanguageDictionary(zhCN)
// register Handsontable's modules
// registerAllModules()

class CustomEditor extends TextEditor {
  createElements() {
    super.createElements()
  }
  close() {
    TextEditor.prototype.close.apply(this, arguments)
  }
  beginEditing() {
    if (
      this.cellProperties &&
      this.cellProperties.cellThis &&
      this.cellProperties.cellThis.startEdit
    ) {
      if (this.cellProperties.cellThis.startEdit(this)) {
        TextEditor.prototype.beginEditing.apply(this, arguments)
        return
      }
      globalHot.deselectCell()
    } else {
      TextEditor.prototype.beginEditing.apply(this, arguments)
    }
  }
}

const hotSettings: GridSettings = {
  data: [],
  language: 'zh-CN',
  colHeaders: false,
  rowHeaders: false,
  manualRowMove: true,
  manualColumnMove: true,
  rowHeights: 0,
  rowHeaderWidth: 0,
  startRows: 0,
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation',
  columns: []
}

function SheetTable({ Opts, sheetId, heightsArray, tdObj = { realHeight: 500 } }) {
  const hotTableComponent = useRef(null)
  const { sheetDict } = useSelector((state: AppState) => state.sheet)
  const dispatch = useDispatch()
  const sheetData = cloneDeep(sheetDict[sheetId])

  useEffect(() => {
    if (hotTableComponent.current && !globalHot) {
      initTable()
    }
  }, [hotTableComponent])

  async function initTable() {
    const readOnly = false,
      { rownumColWidth, tablename, tableOpts, tableArea, fieldarr, rowDefault } = Opts,
      rowHeights = heightsArray[tableArea.tl.y]
    const rowDefaultDict = {}
    let data = []
    //处理数据
    const rowsNum = tableArea.br.y - tableArea.tl.y + 1
    const maxNum = Math.max(rowsNum, sheetData[tablename].length)
    for (let i = 0; i < maxNum; i++) {
      if (sheetData[tablename][i]) {
        continue
      }
      localSetTableData(sheetData, {
        tableName: tablename,
        row: i,
        col: '',
        val: {}
      })
      for (const [field, val] of Object.entries(rowDefault)) {
        localSetTableData(sheetData, {
          tableName: tablename,
          row: i,
          col: field,
          val: val || ''
        })
      }
    }

    hotSettings.rowHeaderWidth = rownumColWidth
    if (readOnly) {
      hotSettings.manualColumnMove = false
      hotSettings.manualRowMove = false
    }
    hotSettings.colHeaders = (tableOpts && tableOpts.colHeaders) || false
    hotSettings.data = sheetData[tablename]
    if (rownumColWidth > 0) hotSettings.rowHeaders = true
    hotSettings.rowHeights = rowHeights
    hotSettings.startRows = rowsNum
    hotSettings.contextMenu = {
      items: {
        row_above: {
          name() {
            return '上方插入行'
          },
          callback: function (key, options) {
            const { start, end } = options[0]
            const insertRows = end.row - start.row + 1
            const len = globalHot.getData().length
            const rowsArr = Array.from({ length: insertRows }, () => rowDefault)
            for (let i = start.row - 1 > 0 ? start.row - 1 : 0; i < len; i++) {
              const cellData = globalHot.getCellMetaAtRow(i)
              for (let j = 0; j < cellData.length; j++) {
                if (cellData[j].renderOk) {
                  globalHot.setCellMeta(cellData[j].row, cellData[j].col, 'renderOk', false)
                }
              }
            }
            sheetData[tablename].splice(
              start.row - insertRows >= 0 ? start.row - insertRows + 1 : 0,
              0,
              ...rowsArr
            )
            globalHot.alter('insert_row_above', start.row, insertRows)
          }
        },
        row_below: {
          name() {
            return '下方插入行'
          },
          callback: async function (key, options) {
            const { start, end } = options[0]
            const len = globalHot.getData().length
            const insertRows = end.row - start.row + 1
            const rowsArr = Array.from({ length: insertRows }, () => rowDefault)
            for (let i = start.row; i < len; i++) {
              const cellData = globalHot.getCellMetaAtRow(i)
              for (let j = 0; j < cellData.length; j++) {
                if (cellData[j].renderOk) {
                  globalHot.setCellMeta(cellData[j].row, cellData[j].col, 'renderOk', false)
                }
              }
            }
            sheetData[tablename].splice(end.row + 1, 0, ...rowsArr)
            globalHot.alter('insert_row_above', end.row + 1, insertRows)
          }
        },
        remove_row: {
          callback: async function (key, options) {
            const { start } = options[0]
            const len = globalHot.getData().length - start.row
            for (let i = start.row; i < len; i++) {
              const cellData = globalHot.getCellMetaAtRow(i)
              for (let j = 0; j < cellData.length; j++) {
                if (cellData[j].renderOk) {
                  globalHot.setCellMeta(cellData[j].row, cellData[j].col, 'renderOk', false)
                }
              }
            }
            sheetData[tablename].splice(start.row, 1)
            globalHot.alter('remove_row', start.row, 1)
          }
        }
      }
    }
    for (let i = 0; i < fieldarr.length; i++) {
      let fieldObj = fieldarr[i]
      const { field, type, options, formula, expressionPos } = fieldObj,
        arr = []
      rowDefaultDict[field] = i
      let realWidth = fieldObj.realWidth
      fieldObj.readonly = readOnly
      'span' == type && (fieldObj.readonly = true)
      fieldObj.realHeight = rowHeights
      arr.push('editcell')
      formula && arr.push('formulacell')
      const className = arr.join(' ')
      if (fieldarr.length - 1 == i) {
        realWidth -= 2
      }
      ;(hotSettings.columns as Array<any>).push({
        data: field,
        renderer: function (
          instance: Handsontable.Core,
          td: HTMLTableCellElement,
          row: number,
          col: number,
          prop: string | number,
          value: any,
          cellProperties: Handsontable.CellProperties
        ) {
          if (cellProperties) {
            if (cellProperties.row == row && cellProperties.renderOk) {
              if (cellProperties.cellThis) {
                cellProperties.cellThis.SetVal &&
                  cellProperties.cellThis.SetVal(
                    (sheetData[tablename][row] && sheetData[tablename][row][field]) || '',
                    false
                  )
                return
              }
            }
          }
          const webComponentName = getWebComponentName(type)
          Handsontable.dom.empty(td)
          instance.setCellMeta(row, col, 'field', field)
          instance.setCellMeta(row, col, 'readonly', fieldObj.readonly)
          instance.setCellMeta(row, col, 'row', row)
          formatStyle(td, fieldObj.styleObject)
          //没有自定义组件
          if (!customElements.get(webComponentName)) {
            const spanDom: HTMLSpanElement = document.createElement('span')
            spanDom.innerText = value
            td.appendChild(spanDom)
            return
          }
          const componentDom: any = document.createElement(webComponentName)
          instance.setCellMeta(row, col, 'cellThis', componentDom)
          if (fieldObj.readonly) {
            componentDom.setAttribute('readonly', 'true')
          }
          let assignObj = {
            tdObj: fieldObj,
            expressionPos: expressionPos,
            cellinfo: fieldObj.info,
            CELL: td,
            tableinfo: { tablename, rowindex: row }
          }
          Object.assign(componentDom, assignObj)

          componentDom.addEventListener('change', async (e: any) => {
            if (e.target != componentDom) return
            const val = e.detail[0]
            globalHot.setDataAtCell(row, rowDefaultDict[field], val)
          })

          td.appendChild(componentDom)
          componentDom.onMounted && componentDom.onMounted()
          componentDom.SetVal(value, false)
          instance.setCellMeta(row, col, 'renderOk', true)
        },
        editor: CustomEditor,
        options: options,
        width: realWidth,
        className: className,
        readOnly: readOnly
      })
    }
    hotSettings.beforeChange = function (options, editor) {
      const [row, field, oldVal, val] = options[0]
      const col = rowDefaultDict[field]
      let cell = globalHot.getCell(row, col)
      cell = cell && cell.firstChild
      if (cell && cell.SetVal) {
        cell.SetVal(val, false)
      }
      localSetTableData(sheetData, {
        tableName: tablename,
        row,
        col: field,
        val
      })
      dispatch(
        setSheetDict({
          sheetData: cloneDeep(sheetData),
          sheetId,
          useSession: true
        })
      )
    }
    globalHot = new Handsontable(hotTableComponent.current, hotSettings)
  }

  return (
    <div style={{ height: tdObj.realHeight + 1 + 'px' }} className={styles['hot-tb-wrapper']}>
      <div ref={hotTableComponent}></div>
    </div>
  )
}

export default SheetTable
