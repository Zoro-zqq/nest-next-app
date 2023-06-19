import React, { useEffect } from 'react'
import { setSheetDict } from '../../store/slice/sheetSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import { ColItem } from '../../settings/sheetType'
import styles from './scss/form.module.scss'
import ExcelCell from './excelCell'
import { cloneDeep } from 'lodash'

let count = 1

function getTdClass(col: ColItem) {
  return `${col.isTable ? styles['table-td'] : ''}`
}

function SheetForm({ Opts, children, sheetId }) {
  const { sheetDict } = useSelector((state: AppState) => state.sheet)
  const dispatch = useDispatch()

  function loaded(e: any) {
    let [customComp, field] = e!.detail
    customComp.SetVal(sheetDict[sheetId].form[field] || '', false)
  }

  function beginEditForm(e) {
    console.log('edit')
  }

  function cellchange(e) {
    if (e && e.detail) {
      const sheetData = sheetDict[sheetId]
      let newData = cloneDeep(sheetData)
      newData.form[e.detail[1]] = e.detail[0]
      dispatch(
        setSheetDict({
          sheetId,
          sheetData: newData,
          useSession: true
        })
      )
    }
  }
  const getDecoratedChildren = (obj = {}) => {
    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        ...obj,
        ...child.props
      })
    })
  }
  if (count === 1) {
    window.addEventListener('beginedit', beginEditForm)
    window.addEventListener('change', cellchange)
    window.addEventListener('loaded', loaded)
    count++
  }
  useEffect(() => {
    return () => {
      window.removeEventListener('beginedit', beginEditForm)
      window.removeEventListener('change', cellchange)
      window.removeEventListener('loaded', loaded)
    }
  }, [])
  return (
    <table className={styles['from-table']}>
      <colgroup>
        {Opts.widths.map((colW, colIndex) => {
          return <col width={colW} key={colIndex}></col>
        })}
      </colgroup>
      <tbody>
        {Opts.tbElements.map((ele, rowIndex) => {
          return (
            <tr style={{ height: ele.height }} key={rowIndex}>
              {ele.cols.map((col, index) => {
                return (
                  <td
                    key={index}
                    className={`${styles['form-td']} ${getTdClass(col)}`}
                    style={{ ...col.styleObject, display: !col.cellMaster ? 'table-cell' : 'none' }}
                    width={col.realWidth - 1}
                    rowSpan={col.rowspan}
                    colSpan={col.colspan}
                  >
                    {col.isTable ? (
                      getDecoratedChildren({
                        tdObj: col
                      })
                    ) : (
                      <>
                        {col.field ? (
                          <ExcelCell type={col.type} styleObject={col.styleObject} col={col} />
                        ) : (
                          <span>{col.text || ''}</span>
                        )}
                      </>
                    )}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default SheetForm
