import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'

const initialState = {
  sheetDict: {}
}

export const sheetSlice = createSlice({
  name: 'sheet',
  initialState,
  reducers: {
    setSheetDict(
      state,
      action: PayloadAction<{
        sheetId: string
        sheetData: Record<string, any>
        useSession: boolean
      }>
    ) {
      const { sheetId, sheetData, useSession = false } = action.payload
      state.sheetDict[sheetId] = sheetData
      if (useSession) {
        sessionStorage.setItem(sheetId, JSON.stringify(sheetData || {}))
      }
    },
    setTableData(
      state,
      action: PayloadAction<{
        tableName: string
        sheetId: string
        row: number
        col: string | number
        val: any
        draft?: boolean
      }>
    ) {
      let { row, tableName, val, col, sheetId, draft = false } = action.payload
      let sheetData = state.sheetDict[sheetId]
      const tableData = sheetData[tableName]
      if (isNaN(row) || (!tableData[row] && !val)) {
        return
      }
      if (col) {
        tableData[row][col] = val
      } else {
        tableData[row] = val
      }
      state.sheetDict[sheetId] = sheetData
      if (draft) {
        sessionStorage.setItem(sheetId, JSON.stringify(sheetData || {}))
      }
    }
  }
})

export const { setSheetDict, setTableData } = sheetSlice.actions

export default sheetSlice.reducer
