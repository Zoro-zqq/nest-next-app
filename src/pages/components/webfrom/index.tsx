import React, { useEffect, useState } from 'react'
import { cloneDeep, forEach, omit } from 'lodash'
import { NativeType, PREFIX } from '../../settings/constants'
import { GetSheetCfg, parseCell } from '../../utils/sheet'
import { setSheetDict } from '../../store/slice/sheetSlice'
import { useDispatch } from 'react-redux'
import { DownloadOutlined } from '@ant-design/icons'
import { getWebComponentName } from '../../utils/sheet'
import styles from './index.module.scss'
import SheetForm from '../sheet/sheetForm'
import SheetTable from '../sheet/sheetTable'

function WebForm(props) {
  const [tplData, setTplData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [areaDict, setAreaDict] = useState(null)
  const [sheetBindTables, setSheetBindTables] = useState(null)
  const [heightsArray, setHeightsArray] = useState(null)
  const dispatch = useDispatch()
  import('../../settings/sheet/' + props.sheet).then(res => {
    setTplData(res.default)
  })
  useEffect(() => {
    if (!tplData) return
    const { data: formData } = tplData
    const typeSet = new Set()
    let sheetData = sessionStorage.getItem(props.sheetId)
    sheetData = (sheetData && JSON.parse(sheetData)) || {}

    console.log('1: ', tplData)

    //初始化，加载所有自定义单元格组件
    const { areaDict, widthsArray, heightsArray, binds, SheetData } = GetSheetCfg(
      cloneDeep(tplData)
    )
    const sheetBindTables: Record<string, any> = {}
    const tableExcelDict: Record<string, any> = {}
    const sheetBindFormDict: Record<string, any> = {}
    const formExcelDict: Record<string, any> = {}
    forEach(binds, (bindObj, bindKey) => {
      if (bindObj.tablename) {
        const { tableArea, tablename } = bindObj,
          { bind, pk, ...rest } = bindObj.tableOpts
        let bindTables = sheetBindTables[tablename]
        if (!bindTables) {
          sheetBindTables[tablename] = {
            ...bindObj,
            pkfield: pk,
            fieldDict: {},
            fieldarr: []
          }
          bindTables = sheetBindTables[tablename]
        }
        let s: Record<string, any> = {},
          l = 0
        forEach(bind, (b, cellLetter) => {
          if (b.field) {
            let field = b.field,
              o = omit(b, ['style', 'key'])
            let i = parseCell(cellLetter),
              u = 0,
              c = o.colspan || 1
            for (let e = i.x; e < i.x + c; e++) u += widthsArray[e]
            if ('$rownum' == field) return void (l = u)
            let f = `@${tablename}.${field}`,
              h = {
                expressionPos: f,
                key: cellLetter,
                realWidth: u,
                info: b,
                styleObject: b.style,
                ...o
              }
            ;(bindTables.fieldDict[field] = h),
              bindTables.fieldarr.push(h),
              o.default ? (s[field] = o.default) : (s[field] = '')
            tableExcelDict[field] = {
              expressionPos: f,
              objpath: tablename,
              field: field,
              info: o
            }
          }
        })
        ;(bindTables.rownumColWidth = l),
          (bindTables.rowDefault = s),
          (bindTables.tbElementObj = areaDict[tablename])
      } else if (bindObj.field) {
        let n = omit(bindObj, ['style', 'key'])
        let r = '@form.' + n.field
        sheetBindFormDict[n.field] = {
          key: bindKey,
          info: n,
          expressionPos: r
        }
        formExcelDict[bindKey] = {
          expressionPos: r,
          objpath: 'form',
          field: n.field,
          info: n
        }
      }
    })
    setAreaDict(areaDict)
    setSheetBindTables(sheetBindTables)
    setHeightsArray(heightsArray)

    init()

    async function init(): Promise<any> {
      for (const ent of formData) {
        let bindArr: Array<any> = Object.values(ent.bind)
        for (const cell of bindArr) {
          if (!NativeType.includes(cell.type)) {
            typeSet.add(cell.type)
          }
        }
      }
      for (const _type of typeSet) {
        try {
          let { default: webComponent } = await import(`../../settings/sheetCells/${_type}.tsx`)
          const webCompName = getWebComponentName(_type as string)
          if (!customElements.get(webCompName)) {
            if (webComponent.class) {
              //注册WebComponent
              console.log(`%c[register:${webCompName}]`, 'color:green')
              customElements.define(webCompName, webComponent.class)
            } else {
              //注册WebComponent
              console.log(`%c[register:${webCompName}]`, 'color:green')
              customElements.define(webCompName, webComponent)
            }
          }
        } catch (e) {
          console.error('customElements load', e)
        }
      }
      setLoaded(true)
    }

    dispatch(
      setSheetDict({
        sheetId: props.sheetId,
        sheetData: Object.assign(SheetData, sheetData),
        useSession: false
      })
    )
  }, [tplData])

  return (
    tplData && (
      <div className={styles['sheet-container']}>
        <div className={styles['sheet-content']}>
          <div className={styles['sheet-header']}>
            <DownloadOutlined className={styles['header-btn']} />
          </div>
          <div className={styles['sheet-wrapper']}>
            <div className={styles['sheet-table-div']}>
              <div className={styles['sheet-table-body']}>
                {loaded ? (
                  <SheetForm Opts={areaDict.form} sheetId={props.sheetId}>
                    {Object.entries(sheetBindTables).map((value, index) => {
                      const [tablename = 'table', table] = value
                      return (
                        <SheetTable
                          key={`${tablename}${index}`}
                          heightsArray={heightsArray}
                          sheetId={props.sheetId}
                          Opts={table}
                        ></SheetTable>
                      )
                    })}
                  </SheetForm>
                ) : (
                  '加载中....'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default WebForm
